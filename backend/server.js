const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const path = require("path");


app.use(cors());
app.use(express.json());

// app.get("/products", async (req, res) => {
//   console.log("GET /products called");
//   try {
//     const products = await prisma.product.findMany();
//     console.log("Products fetched:", products);
//     res.json(products);
//   } catch (err) {
//     console.error("Error in /products:", err);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

// app.get("/api/products", async (req, res) => {
//   console.log("GET /api/products called");
//   try {
//     const products = await prisma.product.findMany();
//     console.log("Products fetched:", products);
//     res.json(products);
//   } catch (err) {
//     console.error("Error in /api/products:", err);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

app.get("/api/products", (req, res) => {
  console.log("📦 /api/products hit — sending mock data");
  res.json([
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
  ]);
});



// Register user
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email, password } });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({ where: { email, password } });
  if (user) res.json(user);
  else res.status(401).json({ error: "Invalid credentials" });
});


app.get("/api/ping", (req, res) => {
  console.log("✅ /api/ping hit!");
  res.json({ message: "pong 🏓" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));


