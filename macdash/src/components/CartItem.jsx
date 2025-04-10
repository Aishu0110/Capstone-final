export default function CartItem({ item, updateQuantity, onRemove }) {
  const price = item.price * (1 - item.discount / 100);

  const handleQtyChange = (e) => {
    const newQty = parseInt(e.target.value);
    if (newQty >= 1) {
      updateQuantity(item.id, newQty);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-4 border-b pb-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 rounded object-cover border"
        onError={(e) => {
          e.target.src = "/fallback.jpg"; // Optional: add default image
          e.target.alt = "Product";
        }}
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-gray-600">${price.toFixed(2)} x {item.quantity}</p>

        <div className="mt-2 flex gap-4 items-center">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQtyChange}
            className="border p-1 w-20 rounded"
          />
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-600 hover:underline text-sm"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
