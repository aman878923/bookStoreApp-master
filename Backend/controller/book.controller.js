import Book from "../model/book.model.js";

export const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book id" });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    console.log(searchTerm);

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const books = await Book.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    });

    console.log("Search term:", searchTerm);
    console.log("Found books:", books);

    res.status(200).json(books);
  } catch (error) {
    console.error("Search error:", error);
    res
      .status(500)
      .json({ message: "Error performing search", error: error.message });
  }
};
// Backend/controller/book.controller.js
// Add these new functions

export const addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { userId, username, rating, review } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newReview = {
      userId,
      username,
      rating,
      review,
    };

    book.reviews.push(newReview);
    await book.save();

    res.status(201).json({ message: "Review added successfully", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding review", error: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { bookId, reviewId } = req.params;
    const { rating, review, userId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const reviewToUpdate = book.reviews.id(reviewId);
    if (!reviewToUpdate) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (reviewToUpdate.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this review" });
    }

    reviewToUpdate.rating = rating;
    reviewToUpdate.review = review;
    await book.save();

    res.status(200).json({ message: "Review updated successfully", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating review", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { bookId, reviewId } = req.params;
    const { userId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const reviewToDelete = book.reviews.id(reviewId);
    if (!reviewToDelete) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (reviewToDelete.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this review" });
    }

    book.reviews.pull(reviewId);
    await book.save();

    res.status(200).json({ message: "Review deleted successfully", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting review", error: error.message });
  }
};
