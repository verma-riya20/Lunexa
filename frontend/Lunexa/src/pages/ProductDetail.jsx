import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="text-2xl font-bold text-pink-600 mb-6">${product.price}</div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Category</h2>
            <span className="inline-block bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Availability</h2>
            <p className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          </div>
          
          <button 
            className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition disabled:opacity-50"
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;