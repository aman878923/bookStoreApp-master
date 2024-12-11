import express from "express";
import { sendContactEmail, sendWelcomeEmail } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/", sendContactEmail);
router.post("/welcome-email", sendWelcomeEmail);

export default router;
