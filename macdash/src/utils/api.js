const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const fallbackProducts = [
  {
    id: 1,
    name: "MacBook Pro M3",
    price: 1999,
    discount: 10,
    category: "MacBook",
    image: "/macbook.jpg"
  },
  {
    id: 2,
    name: "iMac 24-inch",
    price: 1499,
    discount: 5,
    category: "iMac",
    image: "/imac.jpg"
  },
  {
    id: 3,
    name: "Mac Mini M2",
    price: 699,
    discount: 0,
    category: "Mac Mini",
    image: "/macmini.jpg"
  }
];

const fallbackUser = {
  id: 0,
  name: "Guest",
  email: "guest@example.com",
  token: "token"
};

export async function getProducts() {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (err) {
    console.warn("Backend fetch failed for /products:", err.message);
    return fallbackProducts;
  }
}

export async function registerUser(name, email, password) {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error("Register failed");
    return await res.json();
  } catch (err) {
    console.warn("Backend register failed:", err.message);
    return { ...fallbackUser, name, email };
  }
}

export async function loginUser(email, password) {
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return await res.json();
  } catch (err) {
    console.warn("Backend login failed:", err.message);
    return { ...fallbackUser, email };
  }
}
