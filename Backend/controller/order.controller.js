import Order from '../model/order.model.js';
import { sendOrderConfirmationEmail } from '../utils/emailService.js';

export const createOrder = async (req, res) => {
    try {
        const { books, shippingAddress, paymentMethod, totalAmount } = req.body;
        const userId = req.user.id;

        const order = await Order.create({
            user: userId,
            books,
            shippingAddress,
            paymentMethod,
            totalAmount
        });

        await order.populate('books.book');

        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message
        });
    }
};


export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .populate('books.book')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
            .populate('books.book');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to view this order"
            });
        }

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch order",
            error: error.message
        });
    }
};
