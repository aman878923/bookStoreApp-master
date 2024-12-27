import express from "express";
import { authenticateJWT } from "../middleware/auth.js";
import {
    startChatSession,
    sendMessage,
    getChatHistory,
    endChatSession
} from "../controller/chat.controller.js";

const router = express.Router();

router.post("/session/start", authenticateJWT, startChatSession);
router.post("/message", authenticateJWT, sendMessage);
router.get("/history",authenticateJWT, getChatHistory);
router.put("/session/:sessionId/end", authenticateJWT, endChatSession);

export default router;
