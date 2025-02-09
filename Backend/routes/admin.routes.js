import express from 'express';
import { registerAdmin } from '../controller/admin.controller.js';

const router = express.Router();

// Admin registration route with JWT authentication
router.post('/register',  registerAdmin);

export default router;
