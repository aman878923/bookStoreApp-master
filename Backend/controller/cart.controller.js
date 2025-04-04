import Cart from "../model/cart.model.js";
import Book from "../model/book.model.js";
import UserActivity from "../model/userActivity.model.js";

// Add item to cart
export const addToCart = async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart if it doesn't exist
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex(item => item.bookId.toString() === bookId);

    if (itemIndex > -1) {
      // Update quantity if item exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      cart.items.push({ bookId, quantity });
    }

    // Record cart activity
    await UserActivity.create({
      userId,
      bookId,
      activityType: "cart"
    });

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
