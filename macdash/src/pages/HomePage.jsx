import { useEffect, useState } from "react";
import { getProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";


const allProducts = [
  {
    id: 1,
    name: "MacBook Pro M3",
    price: 1999,
    discount: 10,
    image: "/macbook.jpg",
    category: "MacBook",
  },
  {
    id: 2,
    name: "iMac 24-inch",
    price: 1499,
    discount: 5,
    image: "/imac.jpg",
    category: "iMac",
  },
  {
    id: 3,
    name: "Mac Mini M2",
    price: 699,
    discount: 0,
    image: "/macmini.jpg",
    category: "Mac Mini",
  },
];

// export default function HomePage() {
//   const [selectedCategory, setSelectedCategory] = useState("All");

//   const categories = ["All", "MacBook", "iMac", "Mac Mini"];

//   const filteredProducts =
//     selectedCategory === "All"
//       ? allProducts
//       : allProducts.filter((p) => p.category === selectedCategory);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">Featured Products</h1>

//       <div className="flex flex-wrap gap-4 mb-8">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             className={`px-4 py-2 rounded-full border transition ${
//               selectedCategory === cat
//                 ? "bg-black text-white"
//                 : "hover:bg-gray-200"
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }


export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Featured Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}