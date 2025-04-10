import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Local fallback data
const fallbackProducts = {
  1: {
    id: 1,
    name: "MacBook Pro M3",
    description: "Supercharged by the M3 chip. Blazing-fast performance for pros.",
    price: 1999,
    discount: 10,
    specs: ["M3 Chip", "16GB RAM", "1TB SSD"],
    image: "/macbook.jpg",
    category: "MacBook",
  },
  2: {
    id: 2,
    name: "iMac 24-inch",
    description: "Colorful. Capable. Simply a joy to use.",
    price: 1499,
    discount: 5,
    specs: ["M1 Chip", "8GB RAM", "512GB SSD"],
    image: "/imac.jpg",
    category: "iMac",
  },
  3: {
    id: 3,
    name: "Mac Mini M2",
    description: "The next big thing in a small form factor.",
    price: 699,
    discount: 0,
    specs: ["M2 Chip", "8GB RAM", "256GB SSD"],
    image: "/macmini.jpg",
    category: "Mac Mini",
  }
};

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load product");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        console.warn("⚠️ Backend failed, using fallback product.", err.message);
        const fallback = fallbackProducts[id];
        if (fallback) {
          setProduct(fallback);
        } else {
          setError("Product not found");
        }
      });
  }, [id]);

  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!product) return <div className="p-6">Loading product...</div>;

  const discountedPrice = product.price * (1 - product.discount / 100);

  const handleAddToCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = storedCart.find((item) => item.id === product.id);
    const updatedCart = existing
      ? storedCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...storedCart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      <img src={product.image} alt={product.name} className="w-full rounded-xl shadow" />
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="text-xl mb-4">
          <span className="line-through text-gray-400 mr-2">${product.price}</span>
          <span className="text-black font-bold">${discountedPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="ml-2 text-green-500">({product.discount}% off)</span>
          )}
        </div>

        <h3 className="font-semibold mb-2">Specifications:</h3>
        <ul className="list-disc list-inside mb-4">
          {product.specs.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>

        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
