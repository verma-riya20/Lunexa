import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { adminMiddleware } from '../middleware/auth.middleware.js';
import aiController from "../controllers/ai.controller.js";


const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(verifyJWT, adminMiddleware, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(verifyJWT, adminMiddleware, updateProduct)
  .delete(verifyJWT, adminMiddleware, deleteProduct);

  // Game endpoints
router.post("/start", verifyJWT, aiController.startGame);
router.post("/process", verifyJWT, aiController.processResponse);

export default router;