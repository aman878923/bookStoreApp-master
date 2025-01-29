import express from "express";
import { signup, login } from "../controller/user.controller.js";
import { getUserCount,getRecentUsers } from '../controller/user.controller.js';

const router = express.Router();

router.post("/signup", express.json(), signup);
router.post("/login", login);
router.get('/count', getUserCount);
router.get("/recent", getRecentUsers);

export default router;