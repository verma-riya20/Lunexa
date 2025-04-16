import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../utils/ApiError.js";

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing in environment variables");
    }

    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.9
      }
    });
    this.conversationStates = new Map();
  }

  async startNewChat(userId) {
    try {
      const chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: `You are Flo, a friendly AI assistant...` }]
          },
          {
            role: "model",
            parts: [{ text: "🌸 Hi there! I'm Flo..." }]
          }
        ]
      });

      this.conversationStates.set(userId, {
        chat,
        preferences: {},
        questionCount: 0
      });

      return {
        success: true,
        message: "🌸 Hi there! I'm Flo...",
        options: ["Yes, let's go!", "Not right now"],
        progress: 10
      };
    } catch (error) {
      console.error("Gemini initialization error:", error);
      throw new ApiError(500, "Failed to initialize AI chat");
    }
  }

  async getAIResponse(userId, userInput) {
    try {
      const session = this.conversationStates.get(userId);
      if (!session) throw new ApiError(404, "Chat session not found");

      // FIX: Simplified message format
      const result = await session.chat.sendMessage(userInput); // Just send the text directly
      
      const response = await result.response;
      const text = response.text();
      
      // Rest of your processing logic...
      session.questionCount++;
      this._updatePreferences(session.preferences, userInput);

      if (text.includes("RECOMMEND_PHASE") || session.questionCount >= 5) {
        return {
          success: true,
          message: "Based on your answers...",
          preferences: session.preferences,
          isRecommendationPhase: true
        };
      }

      return {
        success: true,
        message: text,
        options: this._extractOptions(text),
        progress: Math.min(10 + (session.questionCount * 18), 90)
      };

    } catch (error) {
      console.error("Gemini response error:", error);
      throw new ApiError(500, "AI processing error");
    }
  }


  _updatePreferences(preferences, userInput) {
    const input = userInput.toLowerCase();
    
    if (input.includes('pad')) preferences.type = 'pads';
    else if (input.includes('tampon')) preferences.type = 'tampons';
    else if (input.includes('cup')) preferences.type = 'cups';
    
    if (input.includes('light')) preferences.flow = 'light';
    else if (input.includes('medium')) preferences.flow = 'medium';
    else if (input.includes('heavy')) preferences.flow = 'heavy';
    
    if (input.includes('sensitive')) preferences.sensitive = true;
    if (input.includes('eco') || input.includes('green')) preferences.ecoFriendly = true;
    if (input.includes('sport')) preferences.active = true;
    if (input.includes('sleep')) preferences.overnight = true;
  }

  _extractOptions(text) {
    const optionRegex = /(\d+\.|\-|\*|👉|🌸)\s*(.+?)(?=\n|$)/g;
    const matches = [...text.matchAll(optionRegex)];
    
    if (matches.length > 0) {
      return matches.map(m => m[2].trim());
    }
    
    if (text.toLowerCase().includes('flow')) {
      return ["Light", "Medium", "Heavy"];
    }
    if (text.toLowerCase().includes('prefer')) {
      return ["Pads", "Tampons", "Menstrual cups"];
    }
    
    return ["Yes", "No", "Not sure"];
  }
}

export default new GeminiService();