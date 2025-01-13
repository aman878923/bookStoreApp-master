import express from "express";
import { 
  addToCart, 
  getCart, 
  removeFromCart, 
  clearCart 
} from "../controller/cart.controller.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

// Add item to cart
router.post("/add", authenticateJWT, addToCart);

// Get user's cart
router.get("/:userId", authenticateJWT, getCart);

// Remove item from cart
router.post("/remove", authenticateJWT, removeFromCart);

// Clear cart
router.post("/clear", authenticateJWT, clearCart);

export default router;
