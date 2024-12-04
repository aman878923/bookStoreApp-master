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
    res.status(500).json({ message: "Error fetching book" });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    console.log("Search term:", searchTerm);

    const books = await Book.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    console.log("Search results:", books);

    res.status(200).json(books);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};
