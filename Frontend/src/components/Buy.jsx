import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaStar,
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Buy() {
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser, addToCart } = useAuth();

  const fetchBook = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://bookstoreapp-master.onrender.com/book/${id}`
      );
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book:", error);
      toast.error("Failed to load book details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  const handleAddToCart = () => {
    if (!authUser) {
      toast.error("Please login to add items to the cart");
      navigate("/login");
      return;
    }
    addToCart(book._id, quantity);
    toast.success("Item added to cart");
  };

  const calculateAverageRating = () => {
    if (!book?.reviews?.length) return 0;
    const sum = book.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / book.reviews.length).toFixed(1);
  };

  // ... (rest of the existing code for handling reviews)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Book not found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-8">
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="md:w-2/3 p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {book.name}
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < Math.round(calculateAverageRating())
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                ({calculateAverageRating()} / 5)
              </span>
            </div>
            <p className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              ${book.price}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {book.title}
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <FaMinus className="text-gray-600 dark:text-gray-400" />
              </button>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <FaPlus className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg flex items-center justify-center space-x-2 transition-all duration-300"
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {/* ... (existing review handling code) */}
    </div>
  );
}

export default Buy;
