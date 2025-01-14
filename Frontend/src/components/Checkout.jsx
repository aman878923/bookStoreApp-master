import React, { useContext, useState } from "react";
import { useAuth } from "../context/AuthProvider"; // Use AuthProvider for cart context
import axios from "axios";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cartItems } = useAuth(); // Access cart items from AuthProvider
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.bookId.price * item.quantity,
    0
  );

  const handleOrderConfirmation = async () => {
    try {
      const orderDetails = {
        items: cartItems,
        totalAmount,
        address: {
          street: address,
          city,
          state,
          zipCode,
        },
        deliveryDate,
      };
      // Send order details to the backend
      await axios.post(
        "https://bookstoreapp-master.onrender.com/order",
        orderDetails
      );
      toast.success("Order confirmed!");
    } catch (error) {
      console.error("Error confirming order:", error);
      toast.error("Failed to confirm order");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-3xl mx-auto bg-indigo-50 rounded-lg shadow-lg p-6">
    <h1 className="text-3xl font-bold text-indigo-900 mb-6">Checkout</h1>

    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">
          Your Cart
        </h2>
        {cartItems.map((item) => (
          <div
            key={item.bookId._id}
            className="flex items-center space-x-4 py-4 border-b border-indigo-200"
          >
            <img
              src={item.bookId.image}
              alt={item.bookId.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="text-indigo-700">
                {item.bookId.name} - ${item.bookId.price} x {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">
          Total Amount
        </h2>
        <p className="text-2xl font-bold text-indigo-900">
          ${totalAmount.toFixed(2)}
        </p>
      </div>

      <div className="bg-indigo-50 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">
          Delivery Details
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-indigo-700"
            >
              Street Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter your street address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-indigo-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-indigo-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                placeholder="Enter your state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-indigo-700"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                placeholder="Enter your zip code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="deliveryDate"
              className="block text-sm font-medium text-indigo-700"
            >
              Delivery Date
            </label>
            <input
              type="date"
              id="deliveryDate"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleOrderConfirmation}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Confirm Order
      </button>
    </div>
  </div>
</div>)};

export default Checkout;
