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
import { getBookCount } from '../controller/book.controller.js';


const router = express.Router();

// Public routes first
router.get("/", getBook);
router.get("/search", searchBooks);
router.get("/:id", getBookById);
router.get('/count', getBookCount);


// Protected review routes
router.post("/:id/reviews", authenticateJWT, addReview);
router.put("/:id/reviews/:reviewId", authenticateJWT, updateReview);
router.delete("/:id/reviews/:reviewId", authenticateJWT, deleteReview);

export default router;
