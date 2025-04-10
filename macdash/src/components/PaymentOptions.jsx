export default function PaymentOptions({ selected, setSelected }) {
    const methods = ["card", "paypal", "apple"];
  
    return (
      <div className="flex gap-4">
        {methods.map((method) => (
          <label key={method} className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value={method}
              checked={selected === method}
              onChange={(e) => setSelected(e.target.value)}
            />
            {method === "card" && "Credit/Debit Card"}
            {method === "paypal" && "PayPal"}
            {method === "apple" && "Apple Pay"}
          </label>
        ))}
      </div>
    );
  }
  