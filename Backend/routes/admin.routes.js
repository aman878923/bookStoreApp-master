import express from 'express';
import { registerAdmin } from '../controller/admin.controller.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Admin registration route with JWT authentication
router.post('/register', authenticateJWT, registerAdmin);

export default router;
