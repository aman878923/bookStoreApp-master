import express from "express";
import { signup, login } from "../controller/user.controller.js";
import { getUserCount } from '../controller/user.controller.js';

const router = express.Router();

router.post("/signup", express.json(), signup);
router.post("/login", login);
router.get('/count', getUserCount);

export default router;