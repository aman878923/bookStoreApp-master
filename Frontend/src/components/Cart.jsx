import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const CartItem = ({ item, onQuantityChange, onRemove, loading }) => (
  <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <img 
      src={item.bookId.image} 
      alt={item.bookId.name} 
      className="w-20 h-28 object-cover rounded"
    />
    <div className="flex-1">
      <h3 className="font-semibold text-lg dark:text-white">{item.bookId.name}</h3>
      <p className="text-pink-600 font-medium">${item.bookId.price}</p>
    </div>
    <div className="flex items-center gap-2">
      <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded">
        <button 
          onClick={() => onQuantityChange(item.bookId._id, item.quantity - 1)}
          className={`px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          -
        </button>
        <span className="px-4 py-1 font-medium dark:text-white">{item.quantity}</span>
        <button 
          onClick={() => onQuantityChange(item.bookId._id, item.quantity + 1)}
           className={`px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
           disabled={loading}
        >
          +
        </button>
      </div>
      <button 
        onClick={() => onRemove(item.bookId._id)}
        className={`text-red-500 hover:text-red-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        Remove
      </button>
    </div>
  </div>
);

const CartSummary = ({ total, onClear, loading }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold dark:text-white">Cart Summary</h3>
      <button 
        onClick={onClear}
        className={`text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        Clear Cart
      </button>
    </div>
    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
      <div className="flex justify-between mb-4">
        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
        <span className="font-medium dark:text-white">${total.toFixed(2)}</span>
      </div>
      <Link
        to="/checkout"
        className={`block w-full bg-pink-600 text-white text-center py-3 rounded-lg hover:bg-pink-700 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        
      >
        Proceed to Checkout
      </Link>
    </div>
  </div>
);

const Cart = () => {
  const { authUser, cartItems, addToCart, removeFromCart, clearCart, loading } = useAuth();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (cartItems?.length) {
      const newTotal = cartItems.reduce((sum, item) => (
        sum + (Number(item.bookId.price) * Number(item.quantity))
      ), 0);
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
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Please login to view your cart</h2>
          <Link to="/login" className="text-pink-600 hover:text-pink-700">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Shopping Cart</h1>
        
        {!cartItems?.length ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <h2 className="text-xl mb-4 dark:text-white">Your cart is empty</h2>
            <Link 
              to="/" 
              className="inline-block bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
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
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
