import ChatSession from "../model/chat.model.js";
import { geminiModel, generateBookstorePrompt } from "../config/gemini.js";

export const startChatSession = async (req, res) => {
    try {
        const userId = req.user.id;
        const newSession = await ChatSession.create({
            userId,
            messages: []
        });
        console.log("session started");
        

        res.status(201).json({
            success: true,
            session: newSession
        });
    } catch (error) {
        console.error("Start chat session error:", error);
        res.status(500).json({
            success: false,
            message: "Error starting chat session"
        });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { sessionId, content } = req.body;
        const userId = req.user.id;

        const session = await ChatSession.findById(sessionId);
        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Chat session not found"
            });
        }
        console.log("inside message");

        // Add user message
        session.messages.push({
            content,
            sender: 'user',
            userId
        });

        // Generate AI response using Gemini
        const prompt = generateBookstorePrompt(content);
        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        const aiResponse = response.text();

        // Add AI response to session
        session.messages.push({
            content: aiResponse,
            sender: 'bot',
            userId
        });

        session.lastActivity = new Date();
        await session.save();

        res.status(200).json({
            success: true,
            message: aiResponse,
            session
        });
    } catch (error) {
        console.error("Send message error:", error);
        res.status(500).json({
            success: false,
            message: "Error processing message"
        });
    }
};

export const getChatHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const sessions = await ChatSession.find({ userId })
            .sort({ lastActivity: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            sessions
        });
    } catch (error) {
        console.error("Get chat history error:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching chat history"
        });
    }
};

export const endChatSession = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const userId = req.user.id;

        const session = await ChatSession.findOneAndUpdate(
            { _id: sessionId, userId },
            { active: false },
            { new: true }
        );

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Chat session not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Chat session ended",
            session
        });
    } catch (error) {
        console.error("End chat session error:", error);
        res.status(500).json({
            success: false,
            message: "Error ending chat session"
        });
    }
};
