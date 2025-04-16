import Product from '../models/product.Model.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(new ApiResponse(200, products, 'Products fetched successfully'));
});

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  
  res.status(200).json(new ApiResponse(200, product, 'Product fetched successfully'));
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, images, stock } = req.body;
  
  const product = new Product({
    user: req.user._id,
    name,
    description,
    price,
    category,
    images,
    stock
  });

  const createdProduct = await product.save();
  res.status(201).json(new ApiResponse(201, createdProduct, 'Product created successfully'));
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, images, stock } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.images = images || product.images;
  product.stock = stock || product.stock;

  const updatedProduct = await product.save();
  res.status(200).json(new ApiResponse(200, updatedProduct, 'Product updated successfully'));
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  await product.deleteOne();
  res.status(200).json(new ApiResponse(200, null, 'Product deleted successfully'));
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};