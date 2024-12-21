import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
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
  const [authUser] = useAuth();

  const fetchBook = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://bookstoreapp-master.onrender.com/book/${id}`
      );
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error("Error fetching book:", error);
      toast.error("Failed to load book details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchBook();
    }
  }, [id, fetchBook]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!authUser) {
      toast.error("Please login to submit a review");
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
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        toast.success("Review submitted successfully");
        setReview("");
        setRating(5);
        fetchBook();
      }
    } catch (error) {
      console.log("Review submission error:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const handleEditReview = async (reviewId) => {
    try {
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
        fetchBook();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `https://bookstoreapp-master.onrender.com/book/${id}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
            "Content-Type": "application/json",
          },
          data: { userId: authUser._id },
        }
      );

      if (response.data) {
        toast.success("Review deleted successfully");
        fetchBook();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete review");
    }
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
          <p className="text-gray-600 dark:text-gray-400">
            The book you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Book Details Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Book Image */}
          <div className="md:w-1/3 p-8">
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Book Info */}
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

            {/* Quantity Selector */}
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

            {/* Add to Cart Button */}
            <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg flex items-center justify-center space-x-2 transition-all duration-300">
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

        {/* Review Form */}
        {authUser && (
          <form
            onSubmit={handleSubmitReview}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Your Rating
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
                Your Review
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
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow transition-all duration-300"
            >
              Submit Review
            </button>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {book.reviews && book.reviews.length > 0 ? (
            book.reviews.map((reviewItem) => (
              <div
                key={reviewItem._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
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
                        onClick={() =>
                          handleEditReview(reviewItem._id, reviewItem)
                        }
                        className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(reviewItem._id)}
                        className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
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
