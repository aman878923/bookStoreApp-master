// Backend/route/book.route.js
import express from "express";
import {
  getBook,
  getBookById,
  searchBooks,
  addReview,
  updateReview,
  deleteReview,
} from "../controller/book.controller.js";

const router = express.Router();

router.get("/search", searchBooks);
router.get("/:id", getBookById);
router.get("/", getBook);

// Review routes
router.post("/:bookId/reviews", addReview);
router.put("/:bookId/reviews/:reviewId", updateReview);
router.delete("/:bookId/reviews/:reviewId", deleteReview);

export default router;
