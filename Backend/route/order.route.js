import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { 
    createOrder, 
    getUserOrders, 
    getOrderById 
} from '../controller/order.controller.js';

const router = express.Router();

router.post('/create', authenticateJWT, createOrder);
router.get('/my-orders', authenticateJWT, getUserOrders);
router.get('/:orderId', authenticateJWT, getOrderById);

export default router;
