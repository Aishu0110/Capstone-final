// utils/auth.js

export function registerUser(email, password, name) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const exists = users.find((u) => u.email === email);
  if (exists) return false;
  users.push({ email, password, name });
  localStorage.setItem("users", JSON.stringify(users));
  return true;
}

  
  export function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    }
    return false;
  }
  