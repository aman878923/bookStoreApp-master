import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Buy() {
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [editingReview, setEditingReview] = useState(null);
  const { id } = useParams();
  const [authUser] = useAuth();

  const fetchBook = useCallback(async () => {
    try {
      const response = await fetch(
        `https://bookstoreapp-master.onrender.com/book/${id}`
      );
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error("Error fetching book:", error);
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
      const response = await fetch(
        `https://bookstoreapp-master.onrender.com/book/${id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: authUser._id,
            username: authUser.fullname,
            rating,
            review,
          }),
        }
      );

      if (response.ok) {
        toast.success("Review submitted successfully");
        setReview("");
        setRating(5);
        fetchBook();
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review");
    }
  };

  const handleEditReview = async (reviewId, existingReview) => {
    if (!editingReview) {
      setEditingReview(reviewId);
      setReview(existingReview.review);
      setRating(existingReview.rating);
      return;
    }

    try {
      const response = await fetch(
        `https://bookstoreapp-master.onrender.com/book/${id}/reviews/${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: authUser._id,
            rating,
            review,
          }),
        }
      );

      if (response.ok) {
        toast.success("Review updated successfully");
        setEditingReview(null);
        setReview("");
        setRating(5);
        fetchBook();
      } else {
        toast.error("Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Error updating review");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `https://bookstoreapp-master.onrender.com/book/${id}/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: authUser._id,
          }),
        }
      );

      if (response.ok) {
        toast.success("Review deleted successfully");
        fetchBook();
      } else {
        toast.error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Error deleting review");
    }
  };

  const calculateAverageRating = () => {
    if (!book?.reviews?.length) return 0;
    const sum = book.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / book.reviews.length).toFixed(1);
  };

  const renderReviews = () => {
    if (!book?.reviews?.length) return <p>No reviews yet</p>;
    
    return (
      <>
        {book.reviews.slice(0, 10).map((reviewItem) => (
          <div key={reviewItem._id} className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-md mb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-lg">{reviewItem.username}</p>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={index < reviewItem.rating ? "text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(reviewItem.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {authUser && authUser._id === reviewItem.userId && (
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditReview(reviewItem._id, reviewItem)}
                    className="btn btn-sm btn-info"
                  >
                    {editingReview === reviewItem._id ? "Cancel Edit" : "Edit"}
                  </button>
                  <button
                    onClick={() => handleDeleteReview(reviewItem._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <p className="mt-3 text-gray-700 dark:text-gray-300">{reviewItem.review}</p>
          </div>
        ))}
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold mb-2">Average Rating</p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
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
            <span className="text-lg font-bold">{calculateAverageRating()}/5</span>
          </div>
        </div>
      </>
    );
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800 pt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Book Details Section */}
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2">
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-full h-[500px] object-contain rounded-lg shadow-md"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h1 className="text-4xl font-bold dark:text-white">{book.name}</h1>
                <div className="badge badge-secondary text-lg px-4 py-3">{book.category}</div>
                <p className="text-xl dark:text-gray-300">{book.title}</p>
                <div className="text-3xl font-bold text-pink-500">
                  ${(book.price * quantity).toFixed(2)}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text text-lg dark:text-white">Select Quantity</span>
                  </label>
                  <select
                    className="select select-bordered text-lg dark:bg-slate-600"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-lg btn-primary w-full bg-pink-500 hover:bg-pink-600 border-none">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Customer Reviews</h2>
            {authUser ? (
              <div className="mb-8 bg-gray-50 dark:bg-slate-600 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Write a Review</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg dark:text-white">Rating:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={`cursor-pointer text-2xl ${
                          star <= rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
                <textarea
                  className="textarea textarea-bordered w-full text-lg dark:bg-slate-700"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review..."
                  rows="4"
                />
                <button
                  onClick={editingReview ? () => handleEditReview(editingReview) : handleSubmitReview}
                  className="btn btn-primary mt-4"
                >
                  {editingReview ? "Update Review" : "Submit Review"}
                </button>
              </div>
            ) : (
              <div className="text-center py-4 bg-gray-50 dark:bg-slate-600 rounded-lg mb-8">
                <p className="text-lg dark:text-white">Please login to submit a review</p>
              </div>
            )}
            <div>{renderReviews()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
