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
<div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Customer Reviews
        </h2>

        {authUser && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editingReview
                ? handleEditReview(editingReview)
                : handleSubmitReview(e);
            }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                {editingReview ? "Edit Rating" : "Your Rating"}
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <FaStar
                      className={`text-2xl ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      } hover:text-yellow-400 transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                {editingReview ? "Edit Review" : "Your Review"}
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                rows="4"
                placeholder="Write your review here..."
                required
              ></textarea>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow transition-all duration-300"
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
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg shadow transition-all duration-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}

        <div className="space-y-6">
          {book.reviews && book.reviews.length > 0 ? (
            book.reviews.map((reviewItem) => (
              <div
                key={reviewItem._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
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
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">
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
