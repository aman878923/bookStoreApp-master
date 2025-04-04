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
export const getBookCount = async (req, res) => {
  try {
      const count = await Book.countDocuments();
      res.status(200).json({ count });
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving book count' });
  }
}

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

import UserActivity from "../model/userActivity.model.js";

// Add to your existing book view controller
export const getBookDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query; // Get userId from query or auth token
    
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    // Record view activity if user is logged in
    if (userId) {
      await UserActivity.create({
        userId,
        bookId: id,
        activityType: "view"
      });
    }
    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update your addReview function to track review activity
export const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, username, rating, review } = req.body;

    console.log("Adding review:", { id, userId, username, rating, review });

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const newReview = {
      userId,
      username,
      rating: Number(rating),
      review,
      createdAt: new Date(),
    };

    book.reviews.push(newReview);
    const updatedBook = await book.save();
    
    // Record review activity
    await UserActivity.create({
      userId,
      bookId: id,
      activityType: "review",
      rating: Number(rating)
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding review",
    });
  }
};
export const updateReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const { userId, username, rating, review } = req.body;

    const book = await Book.findById(id);
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
    console.error("Update review error:", error);
    res
      .status(500)
      .json({ message: "Error updating review", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;
    const { userId } = req.body;

    const book = await Book.findById(id);
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
