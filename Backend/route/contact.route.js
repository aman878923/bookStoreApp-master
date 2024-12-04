import express from "express";
import { sendContactEmail } from "../controller/contact.controller.js";
const router = express.Router();

router.post("/send", sendContactEmail);

export default router;
