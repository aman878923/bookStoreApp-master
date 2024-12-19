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

router.get("/", getBook);
router.get("/:id", getBookById);
router.get("/search", searchBooks);
router.post("/:id/reviews", authenticateJWT, addReview); // Protected route
router.put("/:id/reviews/:reviewId", authenticateJWT, updateReview); // Protected route
router.delete("/:id/reviews/:reviewId", authenticateJWT, deleteReview); // Protected route

export default router;
