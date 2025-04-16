// routes/products.js
import express from 'express';
import Product from '../models/product.Model.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
});

  // Game endpoints
router.post("/start", verifyJWT, aiController.startGame);
router.post("/process", verifyJWT, aiController.processResponse);

export default router;
