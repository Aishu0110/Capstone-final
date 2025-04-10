import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../utils/api";

export default function AuthForm({ type }) {
  const isLogin = type === "login";

  const [name, setName] = useState(""); // name for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      setError("Please enter all required fields");
      return;
    }

    try {
      if (isLogin) {
        const user = await loginUser(email, password);
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/");
      } else {
        await registerUser(name, email, password);
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <img src="/macdash-logo.png" alt="MacDash" className="h-12 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? "Login to MacDash" : "Register for MacDash"}
      </h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />

        <button className="bg-black text-white py-2 rounded hover:bg-gray-800">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
}
