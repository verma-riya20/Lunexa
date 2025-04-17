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
        temperature: 0.7
      }
    });
    this.conversationStates = new Map();
  }

  async startNewChat(userId) {
    try {
      const chat = await this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: `You are Flo, a friendly menstrual health assistant. Please follow these exact instructions:
              1. Ask the user the following 5 questions, one at a time: 
              a) What is your flow level? (light / medium / heavy)
              b) What’s your top comfort concern? (dryness, leak protection, irritation)
              c) Do you prefer pads, tampons, or menstrual cups?
              d) How active are you during your period? (sedentary / moderate / active)
              e) Any special needs? (overnight / sensitive skin / eco-friendly / none)
              
              2. After collecting all 5 answers, generate tailored product recommendations based on those preferences.
              3. Show exactly 3 products in this format:
              RECOMMENDATIONS_START
              • Product Name - Brand
                - Benefits: (short key benefits)
                - Where: (where to buy online — Amazon, Nykaa, Flipkart, etc.)
                - Price: (estimated range)
              RECOMMENDATIONS_END
              4. Pull up-to-date product suggestions from real online listings if possible.
              5. Do not invent features. Only show menstrual health products aligned to the preferences.` }]
          },
          {
            role: "model",
            parts: [{ text: "🌸 Welcome! Let's find your perfect period products.\n\nHow would you describe your flow?\n1. Light\n2. Medium\n3. Heavy" }]
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
        message: "🌸 Welcome! Let's find your perfect period products.",
        options: ["Light", "Medium", "Heavy"],
        progress: 10
      };
    } catch (error) {
      console.error("Chat initialization error:", error);
      throw new ApiError(500, "Failed to start conversation. Please try again.");
    }
  }

  async getAIResponse(userId, userInput) {
    try {
      const session = this.conversationStates.get(userId);
      if (!session) throw new ApiError(404, "Chat session not found");

      this._updatePreferences(session.preferences, userInput, session.questionCount);

      const result = await session.chat.sendMessage(userInput);
      const text = result.response ? await Promise.all(result.response.map(r => r.text())) : result.text;

      console.log("🧠 Gemini raw response:", text);

      session.questionCount++;

      if (session.questionCount >= 5 || text.includes("RECOMMENDATIONS_START")) {
        const recommendations = this._parseRecommendations(text);

        return {
          success: true,
          message: "🌸 Here are personalized products just for you!",
          products: recommendations,
          preferences: session.preferences,
          isRecommendationPhase: true,
          progress: 100
        };
      }

      return {
        success: true,
        message: this._cleanMessage(text),
        options: this._extractOptions(text),
        progress: Math.min(10 + session.questionCount * 18, 90)
      };
    } catch (error) {
      console.error("AI response error:", error);
      throw new ApiError(500, `I'm having trouble processing that. Could you try again? Error: ${error.message}`);
    }
  }

  _updatePreferences(preferences, userInput, questionCount) {
    const input = userInput.toLowerCase();
    switch (questionCount) {
      case 0:
        if (input.includes("light")) preferences.flow = "light";
        else if (input.includes("medium")) preferences.flow = "medium";
        else if (input.includes("heavy")) preferences.flow = "heavy";
        break;
      case 1:
        if (input.includes("dry")) preferences.comfort = "dryness";
        else if (input.includes("leak")) preferences.comfort = "leak protection";
        else if (input.includes("irritat")) preferences.comfort = "irritation";
        break;
      case 2:
        if (input.includes("pad")) preferences.type = "pads";
        else if (input.includes("tampon")) preferences.type = "tampons";
        else if (input.includes("cup")) preferences.type = "cups";
        break;
      case 3:
        if (input.includes("sitting")) preferences.activity = "sedentary";
        else if (input.includes("moderate")) preferences.activity = "moderate";
        else if (input.includes("active")) preferences.activity = "active";
        break;
      case 4:
        preferences.specialNeeds = [];
        if (input.includes("overnight")) preferences.specialNeeds.push("overnight");
        if (input.includes("sensitive")) preferences.specialNeeds.push("sensitive skin");
        if (input.includes("eco")) preferences.specialNeeds.push("eco-friendly");
        if (input.includes("none")) preferences.specialNeeds = [];
        break;
    }
  }

  _parseRecommendations(text) {
    const recommendations = [];
    const regex = /[-•*]\s*(.+?)\s*-\s*(.+?)\n\s*- Benefits: (.+?)\n\s*- Where: (.+?)\n\s*- Price: (.+?)(?=\n[-•*]|$)/gs;
    let match;
    while ((match = regex.exec(text)) !== null) {
      recommendations.push({
        name: `${match[1]} - ${match[2]}`,
        benefits: match[3].trim(),
        where: match[4].trim(),
        price: match[5].trim()
      });
    }

    return recommendations;
  }

  _cleanMessage(text) {
    return text
      .replace(/\*/g, "")
      .replace(/#/g, "")
      .replace(/RECOMMENDATIONS_START|RECOMMENDATIONS_END/g, "")
      .trim();
  }

  _extractOptions(text) {
    const optionRegex = /^\d+\.\s*(.+)$/gm;
    const matches = [];
    let match;
    while ((match = optionRegex.exec(text)) !== null) {
      matches.push(match[1]);
    }

    if (matches.length === 0) {
      if (text.includes("flow")) return ["Light", "Medium", "Heavy"];
      if (text.includes("comfort")) return ["Stay dry", "Prevent leaks", "Minimize irritation"];
      if (text.includes("product")) return ["Pads", "Tampons", "Menstrual cups"];
      if (text.includes("activity")) return ["Mostly sitting", "Moderate activity", "Very active"];
      if (text.includes("special")) return ["Overnight protection", "Sensitive skin", "Eco-friendly", "None"];
    }

    return matches;
  }
}

export default new GeminiService();
