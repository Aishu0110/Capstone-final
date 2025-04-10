import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const discountedPrice = product.price * (1 - product.discount / 100);

  return (
    <Link
      to={`/product/${product.id}`}
      className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
    >
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 line-through">${product.price}</p>
        <p className="text-black font-bold">${discountedPrice.toFixed(2)}</p>
        {product.discount > 0 && (
          <p className="text-sm text-green-500">{product.discount}% off</p>
        )}
      </div>
    </Link>
  );
}
