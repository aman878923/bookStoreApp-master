import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CartItem = ({ item, onQuantityChange, onRemove, loading }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
    <div className="relative group">
      <img
        src={item.bookId.image}
        alt={item.bookId.name}
        className="w-24 h-32 object-cover rounded-xl shadow-md transform transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>

    <div className="flex-1 space-y-2">
      <h3 className="font-semibold text-xl dark:text-white">
        {item.bookId.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {item.bookId.author}
      </p>
      <p className="text-pink-600 dark:text-pink-400 font-bold text-lg">
        ${item.bookId.price}
      </p>
    </div>

    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
      <div className="flex items-center bg-gray-50 dark:bg-gray-700 rounded-full p-1">
        <button
          onClick={() => onQuantityChange(item.bookId._id, item.quantity - 1)}
          className={`p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
        <span className="w-12 text-center font-medium dark:text-white">
          {item.quantity}
        </span>
        <button
          onClick={() => onQuantityChange(item.bookId._id, item.quantity + 1)}
          className={`p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      <button
        onClick={() => onRemove(item.bookId._id)}
        className={`flex items-center gap-2 px-4 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        <span className="hidden sm:inline">Remove</span>
      </button>
    </div>
  </div>
);

const CartSummary = ({ total, onClear, loading, itemCount }) => (
  <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-24">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-bold dark:text-white">Cart Summary</h3>
      <button
        onClick={onClear}
        className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        Clear Cart
      </button>
    </div>

    <div className="space-y-4">
      <div className="flex justify-between py-4 border-t border-gray-100 dark:border-gray-700">
        <span className="text-gray-600 dark:text-gray-400">
          Items ({itemCount})
        </span>
        <span className="font-medium dark:text-white">${total.toFixed(2)}</span>
      </div>

      <div className="flex justify-between py-4 border-t border-gray-100 dark:border-gray-700">
        <span className="text-gray-600 dark:text-gray-400">Shipping</span>
        <span className="font-medium text-green-500">Free</span>
      </div>

      <div className="flex justify-between py-4 border-t border-b border-gray-100 dark:border-gray-700">
        <span className="text-lg font-semibold dark:text-white">Total</span>
        <span className="text-lg font-bold text-pink-600 dark:text-pink-400">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>

    <Link
      to="/checkout"
      className={`mt-8 block w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-center py-4 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/25 transition-all duration-300 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      Proceed to Checkout
    </Link>
  </div>
);

const Cart = () => {
  const { authUser, cartItems, addToCart, removeFromCart, clearCart, loading } =
    useAuth();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cartItems?.length) {
      const newTotal = cartItems.reduce(
        (sum, item) => sum + Number(item.bookId.price) * Number(item.quantity),
        0
      );
      setTotal(newTotal);
    } else {
      setTotal(0);
    }
  }, [cartItems]);

  const handleQuantityChange = async (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await addToCart(bookId, newQuantity);
      toast.success("Cart updated");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const handleRemoveItem = async (bookId) => {
    try {
      await removeFromCart(bookId);
      toast.success("Item removed");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">
            Please login to view your cart
          </h2>
          <Link to="/login" className="text-pink-600 hover:text-pink-700">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 dark:text-white">
          Shopping Cart
        </h1>

        {!cartItems?.length ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="max-w-md mx-auto space-y-6">
              <svg
                className="w-24 h-24 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="text-2xl font-semibold dark:text-white">
                Your cart is empty
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Looks like you haven't added any books to your cart yet.
              </p>
              <Link
                to="/"
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.bookId._id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                  loading={loading}
                />
              ))}
            </div>
            <div className="lg:col-span-1">
              <CartSummary
                total={total}
                onClear={handleClearCart}
                loading={loading}
                itemCount={cartItems.length}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
