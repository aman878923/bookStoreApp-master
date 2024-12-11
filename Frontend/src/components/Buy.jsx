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
      // Set up editing mode
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

  const renderReviews = () => {
    return book.reviews.map((reviewItem) => (
      <div key={reviewItem._id} className="border-b py-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold">{reviewItem.username}</p>
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
        <p className="mt-2">{reviewItem.review}</p>
        <p className="text-sm text-gray-500 mt-1">
          {new Date(reviewItem.createdAt).toLocaleDateString()}
        </p>
      </div>
    ));
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8 dark:bg-slate-800 pt-14">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2 h-[500px]">
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-full object-contain rounded-lg shadow-xl"
            />
          </div>

          <div className="w-full md:w-1/2 space-y-6 dark:text-white p-4 min-h-[500px]">
            <h1 className="text-3xl font-bold">{book.name}</h1>
            <div className="badge badge-secondary">{book.category}</div>
            <p className="text-lg">{book.title}</p>
            <div className="text-2xl font-bold text-pink-500">
              ${(book.price * quantity).toFixed(2)}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text dark:text-white">
                  Select Quantity
                </span>
              </label>
              <select
                className="select select-bordered dark:bg-slate-700"
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

            <button className="btn btn-primary w-full max-w-xs bg-pink-500 hover:bg-pink-600 border-none">
              Proceed to Checkout
            </button>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Reviews</h3>
              {authUser ? (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="label-text">Rating:</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer ${
                            star <= rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Write your review..."
                  />
                  <button
                    onClick={
                      editingReview
                        ? () => handleEditReview(editingReview)
                        : handleSubmitReview
                    }
                    className="btn btn-primary mt-2"
                  >
                    {editingReview ? "Update Review" : "Submit Review"}
                  </button>
                </div>
              ) : (
                <p>Please login to submit a review</p>
              )}
              <div className="space-y-4">{renderReviews()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
