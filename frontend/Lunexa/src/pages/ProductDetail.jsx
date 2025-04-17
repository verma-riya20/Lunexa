import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <div className="text-center mt-20 text-lg text-gray-600">Loading...</div>;
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-pink-700">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl text-green-600 font-semibold mt-4">₹{product.price}</p>

          <div className="mt-6 flex gap-4">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
              Add to Cart
            </button>
            <button className="border border-pink-500 text-pink-500 px-4 py-2 rounded hover:bg-pink-50">
              Add to Wishlist
            </button>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock}</p>
            <p>Ratings: ⭐ {product.ratings} ({product.numOfReviews} reviews)</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
