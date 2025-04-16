import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Product from "../models/product.Model.js";
import geminiService from "../ai/gemini.services.js";

const aiController = {
  startGame: asyncHandler(async (req, res) => {
    const userId = req.user._id.toString();
    const response = await geminiService.startNewChat(userId);
    res.status(200).json(response);
  }),

  processResponse: asyncHandler(async (req, res) => {
    const userId = req.user._id.toString();
    const { answer } = req.body;

    const response = await geminiService.getAIResponse(userId, answer);

    if (response.isRecommendationPhase) {
      const products = await Product.find({
        ...(response.preferences.type && { category: response.preferences.type }),
        ...(response.preferences.flow && { absorbency: response.preferences.flow }),
        ...(response.preferences.sensitive && { hypoallergenic: true }),
        ...(response.preferences.ecoFriendly && { ecoFriendly: true })
      }).limit(3);

      return res.status(200).json({
        ...response,
        products,
        progress: 100
      });
    }

    res.status(200).json(response);
  })
};

export default aiController;