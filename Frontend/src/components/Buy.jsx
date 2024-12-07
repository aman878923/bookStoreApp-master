import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";


function Buy() {
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://bookstoreapp-master.onrender.com/book/${id}`
        );
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetchBook();
  }, [id]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log({ rating, review });
    setReview("");
    setRating(5);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <>
    
      <div className="min-h-screen p-8 dark:bg-slate-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Book Image */}
            <div className="w-full md:w-1/2 h-[500px]">
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-full object-contain rounded-lg shadow-xl"
              />
            </div>

            {/* Book Details */}
            <div className="w-full md:w-1/2 space-y-6 dark:text-white p-4 min-h-[500px]">
              <h1 className="text-3xl font-bold">{book.name}</h1>
              <div className="badge badge-secondary">{book.category}</div>
              <p className="text-lg">{book.title}</p>
              <div className="text-2xl font-bold text-pink-500">
                ${(book.price * quantity).toFixed(2)}
              </div>

              {/* Quantity Selection */}
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

              {/* Checkout Button */}
              <button className="btn btn-primary w-full max-w-xs bg-pink-500 hover:bg-pink-600 border-none">
                Proceed to Checkout
              </button>
            </div>
            {/* Review section moved to bottom */}
            <div className="w-full border rounded-lg p-4 dark:text-white mt-8">
              <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

              <div className="flex items-center gap-2 mb-4">
                <span className="label-text dark:text-white">Rating:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer ${
                        star <= rating ? "text-yellow-400" : "text-gray-300"
                      } hover:scale-110 transition-transform`}
                      onClick={() => setRating(star)}
                      size={24}
                    />
                  ))}
                </div>
              </div>

              <textarea
                className="textarea textarea-bordered w-full h-24 dark:bg-slate-700 dark:text-white resize-none"
                placeholder="Write your review here..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>

              <button
                onClick={handleSubmitReview}
                className="btn btn-secondary mt-4"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Buy;
