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
  const handleEditClick = (reviewItem) => {
    setEditingReview(reviewItem._id);
    setReview(reviewItem.review);
    setRating(reviewItem.rating);
  };
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!authUser) {
      toast.error("Please login to submit a review");
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("Token");
      const response = await axios.post(
        `https://bookstoreapp-master.onrender.com/book/${id}/reviews`,
        {
          userId: authUser._id,
          username: authUser.fullname,
          rating,
          review,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data) {
        toast.success("Review submitted successfully");
        setReview("");
        setRating(5);
        fetchBook();
      }
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  const handleEditReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.put(
        `https://bookstoreapp-master.onrender.com/book/${id}/reviews/${reviewId}`,
        {
          userId: authUser._id,
          rating,
          review,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        toast.success("Review updated successfully");
        setEditingReview(null);
        setReview("");
        setRating(5);
        await fetchBook();
      }
    } catch (error) {
      console.error("Edit review error:", error);
      toast.error("Failed to update review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `https://bookstoreapp-master.onrender.com/book/${id}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
          data: { userId: authUser._id },
        }
      );

      if (response.data) {
        toast.success("Review deleted successfully");
        fetchBook();
      }
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };
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
    <div className="container mx-auto px-4 py-8 pt-20 max-w-7xl">
      {/* Book Details Card */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg border border-gray-100 dark:border-gray-700">
        <div className="md:flex gap-8">
          {/* Image Section */}
          <div className="md:w-1/3 p-8">
            <div className="relative group">
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-auto rounded-2xl shadow-xl object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-2/3 p-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {book.name}
            </h1>

            {/* Rating Section */}
            <div className="flex items-center mb-6 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-full w-fit">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.round(calculateAverageRating())
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-3 text-gray-600 dark:text-gray-300 font-medium">
                {calculateAverageRating()} / 5
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                ${book.price}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed">
              {book.title}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                >
                  <FaMinus className="text-gray-600 dark:text-gray-400" />
                </button>
                <span className="w-12 text-center font-semibold text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                >
                  <FaPlus className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-8 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-pink-500/25"
              >
                <FaShoppingCart className="text-xl" />
                <span className="text-lg">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Customer Reviews
        </h2>

        {/* Review Form */}
        {authUser && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editingReview
                ? handleEditReview(editingReview)
                : handleSubmitReview(e);
            }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-10 border border-gray-100 dark:border-gray-700"
          >
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-3">
                {editingReview ? "Edit Rating" : "Your Rating"}
              </label>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transform transition-transform hover:scale-110"
                  >
                    <FaStar
                      className={`text-3xl ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-3">
                {editingReview ? "Edit Review" : "Your Review"}
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-all duration-300"
                rows="4"
                placeholder="Share your thoughts about this book..."
                required
              ></textarea>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:shadow-pink-500/25"
              >
                {editingReview ? "Update Review" : "Submit Review"}
              </button>
              {editingReview && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingReview(null);
                    setReview("");
                    setRating(5);
                  }}
                  className="px-8 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl shadow-lg transition-all duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {book.reviews && book.reviews.length > 0 ? (
            book.reviews.map((reviewItem) => (
              <div
                key={reviewItem._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg text-gray-900 dark:text-white">
                      {reviewItem.username}
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={
                              index < reviewItem.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(reviewItem.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {authUser && authUser._id === reviewItem.userId && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditClick(reviewItem)}
                        className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(reviewItem._id)}
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
                <p className="mt-4 text-gray-700 dark:text-gray-300">
                  {reviewItem.review}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No reviews yet. Be the first to review!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Buy;
