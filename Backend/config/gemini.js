import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: {
    maxOutputTokens: 200, // Adjust this number to control response length
  },
});

export const generateBookstorePrompt = (userMessage) => {
  return `As a bookstore assistant, help with: ${userMessage}. 
    and help in Consider book recommendations, order inquiries, and general bookstore information if user asks. and answer in short `;
};
