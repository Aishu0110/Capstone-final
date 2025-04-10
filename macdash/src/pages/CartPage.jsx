import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

// Default fallback items (used only if localStorage is empty)
const defaultCart = [
  {
    id: 1,
    name: "MacBook Pro M3",
    image: "/macbook.jpg",
    price: 1999,
    discount: 10,
    quantity: 1,
  },
  {
    id: 2,
    name: "iMac 24-inch",
    image: "/imac.jpg",
    price: 1499,
    discount: 5,
    quantity: 2,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      setCartItems(defaultCart);
      localStorage.setItem("cart", JSON.stringify(defaultCart));
    }

    const savedCoupon = localStorage.getItem("coupon");
    if (savedCoupon) {
      const { code, discount } = JSON.parse(savedCoupon);
      setCoupon(code);
      setAppliedDiscount(discount);
    }
  }, []);

  const updateQuantity = (id, newQty) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.price * (1 - item.discount / 100);
    return acc + price * item.quantity;
  }, 0);

  const total = subtotal * (1 - appliedDiscount / 100);

  const handleApplyCoupon = () => {
    if (coupon === "MAC10") {
      setAppliedDiscount(10);
      localStorage.setItem("coupon", JSON.stringify({ code: coupon, discount: 10 }));
    } else {
      alert("Invalid coupon");
    }
  };

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 3);

  const handleRemove = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          updateQuantity={updateQuantity}
          onRemove={handleRemove}
        />
      ))}

      <div className="mt-6">
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="border p-2 mr-2 rounded"
        />
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={handleApplyCoupon}
        >
          Apply
        </button>
      </div>

      <div className="mt-6 text-lg">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Discount: {appliedDiscount}%</p>
        <p className="font-bold text-xl">Total: ${total.toFixed(2)}</p>
        <p className="mt-2 text-sm text-gray-500">
          Estimated Delivery: {estimatedDate.toDateString()}
        </p>
      </div>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
