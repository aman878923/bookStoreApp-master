import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-pro",
  generationConfig: {
    maxOutputTokens: 100, // Adjust this number to control response length
  },
});

export const generateBookstorePrompt = (userMessage) => {
  return `As a bookstore assistant, help with: ${userMessage}. 
    Consider book recommendations, order inquiries, and general bookstore information. and answer in short `;
};
