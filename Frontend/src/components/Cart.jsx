import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = () => {
  const { authUser, cartItems, addToCart, removeFromCart, clearCart } = useAuth();
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      fetchCart();
    }
  }, [authUser, cartItems]);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://bookstoreapp-master.onrender.com/cart/${authUser._id}`
      );
      const items = response.data.items || [];
      calculateTotal(items);
    } catch (error) {
      toast.error("Failed to fetch cart items");
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const totalPrice = items.reduce(
      (sum, item) => sum + item.bookId.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  const handleQuantityChange = async (bookId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await addToCart(bookId, newQuantity);
      calculateTotal(cartItems);
      toast.success("Quantity updated");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (bookId) => {
    try {
      await removeFromCart(bookId);
      calculateTotal(cartItems);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      setTotal(0);
      toast.success("Cart cleared");
    } catch (error) {
      toast.error("Failed to clear cart");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading cart...</div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-300">Please login to view your cart</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">
          Shopping Cart
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h3 className="text-xl text-gray-600 dark:text-gray-300">Your cart is empty</h3>
            <Link to="/" className="mt-4 inline-block px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.bookId._id}
                className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all hover:shadow-md"
              >
                <img
                  src={item.bookId.image}
                  alt={item.bookId.name}
                  className="w-24 h-32 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {item.bookId.name}
                  </h2>
                  <p className="text-lg font-medium text-pink-500">
                    ${item.bookId.price}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => handleQuantityChange(item.bookId._id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium text-gray-800 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.bookId._id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.bookId._id)}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Total: ${total.toFixed(2)}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleClearCart}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <Link
                    to="/checkout"
                    className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-center"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;