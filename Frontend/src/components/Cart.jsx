import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

const Cart = () => {
  const { authUser, cartItems } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (authUser) {
      fetchCart();
    }
  }, [authUser, cartItems]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`https://bookstoreapp-master.onrender.com/cart/${authUser._id}`);
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  return (
    <div className="p-4">
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
                <span className="text-gray-800 dark:text-white">Qty: {item.quantity}</span>
                <button className="text-red-500 hover:text-red-700">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
