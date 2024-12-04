import express from "express";
import { getBook,getBookById,searchBooks } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.get("/:id", getBookById);
router.get("/search", searchBooks);


export default router;