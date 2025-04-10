export default function AddressForm({ address, setAddress }) {
    const handleChange = (e) => {
      setAddress({ ...address, [e.target.name]: e.target.value });
    };
  
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={address.name}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={address.street}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={address.zip}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
      </div>
    );
  }
  