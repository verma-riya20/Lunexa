import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Menstrual Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-pink-600">${product.price}</span>
                <Link 
                  to={`/products/${product._id}`} 
                  className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;