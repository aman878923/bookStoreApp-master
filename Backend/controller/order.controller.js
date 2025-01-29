import Order from "../model/order.model.js";
import { sendOrderConfirmationEmail } from "../utils/emailService.js";

export const createOrder = async (req, res) => {
  try {
    const { books, shippingAddress, paymentMethod, totalAmount } = req.body;
    const userId = req.user.id;

    const order = await Order.create({
      user: userId,
      books,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    await order.populate("books.book");
    // In createOrder function, update the email sending part to:
    await sendOrderConfirmationEmail(req.user.email, order);

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};
// order.controller.js

export const getOrderCount = async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching order count" });
  }
};

export const getRevenue = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          amount: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.status(200).json(revenue);
  } catch (error) {
    res.status(500).json({ message: "Error fetching revenue data" });
  }
};

export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent orders" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("books.book")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "books.book"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};
