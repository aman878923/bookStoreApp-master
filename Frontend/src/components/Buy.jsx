import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Buy() {
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState(null);
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

  if (!book) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8 dark:bg-slate-800">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2">
            <img
              src={book.image}
              alt={book.name}
              className="w-full rounded-lg shadow-xl"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6 dark:text-white">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Buy;
