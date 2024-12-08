import express from "express";
import { signup, login, logout } from "../controller/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authenticateUser, logout);

export default router;
