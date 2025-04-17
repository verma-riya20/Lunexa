import { asyncHandler } from "../utils/asyncHandler.js";
import geminiService from "../ai/gemini.services.js";

const aiController = {
  startGame: asyncHandler(async (req, res) => {
    const userId = req.user?._id?.toString() || "test-user";
    try {
      const response = await geminiService.startNewChat(userId);
      res.status(200).json(response);
    } catch (error) {
      console.error("Error starting chat:", error);
      res.status(500).json({ error: "Failed to start conversation. Please try again." });
    }
  }),

  processResponse: asyncHandler(async (req, res) => {
    const userId = req.user?._id?.toString() || "test-user";
    const { answer } = req.body;

    try {
      const response = await geminiService.getAIResponse(userId, answer);
      return res.status(200).json(response);
    } catch (error) {
      console.error("Error processing response:", error);
      res.status(500).json({ error: "I'm having trouble processing that. Could you try again?" });
    }
  })
};

export default aiController;
