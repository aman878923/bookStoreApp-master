import express from "express";
import {
  getBook,
  getBookById,
  searchBooks,
  addReview,
  updateReview,
  deleteReview,
} from "../controller/book.controller.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

// Public routes first
router.get("/", getBook);
router.get("/search", searchBooks);
router.get("/:id", getBookById);

// Protected review routes
router.post("/:id/reviews", authenticateJWT, addReview);
router.put("/:id/reviews/:reviewId", authenticateJWT, updateReview);
router.delete("/:id/reviews/:reviewId", authenticateJWT, deleteReview);

export default router;
