// backend/src/routes/ai.routes.js
import express from 'express';
import aiController from "../controllers/ai.controller.js";
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

// Game endpoints
router.post("/start", verifyJWT, aiController.startGame);
router.post("/process", verifyJWT, aiController.processResponse);

export default router;