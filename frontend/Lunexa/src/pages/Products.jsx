import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  const filtered = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : [];

  return (
    <div className="bg-pink-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <section className="bg-pink-100 py-12 px-4 text-center">
        <motion.h1
          className="text-4xl font-bold text-pink-700 mb-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          Welcome to Menstrual Wellness
        </motion.h1>
        <p className="text-lg text-pink-600">
          Choose comfort, care, and confidence during your cycle
        </p>
      </section>

      {/* Categories */}
      <section className="p-6">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4 text-center">Shop by Category</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-24 h-24 flex items-center justify-center bg-white rounded-full shadow text-center text-sm font-medium text-pink-700 hover:bg-pink-100"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Products */}
      {selectedCategory && (
        <section className="p-6">
          <h3 className="text-xl font-semibold text-pink-600 mb-4">
            {selectedCategory}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg"
              >
                <img
                  src={product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <h4 className="text-lg font-semibold text-pink-700">{product.name}</h4>
                <p className="text-green-600 font-bold">₹{product.price}</p>
                <div className="mt-4 flex gap-2">
                  <button className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600">
                    Add to Cart
                  </button>
                  <button className="border border-pink-500 text-pink-500 px-3 py-1 rounded hover:bg-pink-100">
                    Add to Wishlist
                  </button>
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="text-sm text-blue-600 underline"
                  >
                    View
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductListPage;
