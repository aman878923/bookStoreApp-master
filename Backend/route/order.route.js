import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { 
    createOrder, 
    getUserOrders, 
    getOrderById 
} from '../controller/order.controller.js';
import { getOrderCount, getRevenue, getRecentOrders } from "../controller/order.controller";


const router = express.Router();

router.post('/create', authenticateJWT, createOrder);
router.get('/my-orders', authenticateJWT, getUserOrders);
router.get("/count", getOrderCount);
router.get("/revenue", getRevenue);
router.get("/recent", getRecentOrders);
router.get('/:orderId', authenticateJWT, getOrderById);

export default router;
