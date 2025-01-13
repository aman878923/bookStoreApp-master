import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const { authUser, cartItems, addToCart, removeFromCart, clearCart } = useAuth();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (authUser) {
      fetchCart();
    }
  }, [authUser, cartItems]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`https://bookstoreapp-master.onrender.com/cart/${authUser._id}`);
      setCart(response.data.items || []);
      calculateTotal(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const calculateTotal = (items) => {
    const totalPrice = items.reduce((sum, item) => sum + (item.bookId.price * item.quantity), 0);
    setTotal(totalPrice);
  };

  const handleQuantityChange = async (bookId, quantity) => {
    if (quantity < 1) return;
    try {
      await addToCart(bookId, quantity);
      fetchCart();
      toast.success("Quantity updated successfully");
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (bookId) => {
    try {
      await removeFromCart(bookId);
      fetchCart();
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      fetchCart();
      toast.success("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.bookId._id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md dark:bg-slate-800">
              <div className="flex items-center space-x-4">
                <img src={item.bookId.image} alt={item.bookId.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h2 className="font-semibold text-gray-800 dark:text-white">{item.bookId.name}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">${item.bookId.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.bookId._id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded hover:bg-gray-300 dark:hover:bg-slate-600"
                  >
                    -
                  </button>
                  <span className="text-gray-800 dark:text-white">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.bookId._id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 dark:bg-slate-700 rounded hover:bg-gray-300 dark:hover:bg-slate-600"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.bookId._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md dark:bg-slate-800">
            <h3 className="font-semibold text-gray-800 dark:text-white">Total: ${total.toFixed(2)}</h3>
            <div className="space-x-4">
              <button
                onClick={handleClearCart}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
              <button
                onClick={() => toast.success("Proceeding to checkout")}
                className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
