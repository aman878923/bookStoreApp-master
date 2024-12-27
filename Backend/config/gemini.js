import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });

export const generateBookstorePrompt = (userMessage) => {
    return `As a bookstore assistant, help with: ${userMessage}. 
    Consider book recommendations, order inquiries, and general bookstore information.`;
};
