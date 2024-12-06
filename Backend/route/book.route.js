import express from "express";
import {
  getBook,
  getBookById,
  searchBooks,
} from "../controller/book.controller.js";

const router = express.Router();
router.get("/search", searchBooks);
router.get("/:id", getBookById);

router.get("/", getBook);

export default router;
