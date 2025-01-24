import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Checkout = () => {
  const navigate = useNavigate();
  const { authUser, cartItems, addToCart, removeFromCart, clearCart } =
    useAuth();
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  useEffect(() => {
    if (!authUser || !cartItems || cartItems.length === 0) {
      navigate('/cart');
    }
  }, [authUser, cartItems, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          books: cartItems.map((item) => ({
            book: item._id,
            quantity: item.quantity,
            price: item.price,
          })),
          shippingAddress,
          paymentMethod,
          totalAmount: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
        }),
      });

      const data = await response.json();
      if (data.success) {
        clearCart();
        navigate(`/order-success/${data.order._id}`);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Street Address"
              className="input input-bordered w-full"
              value={shippingAddress.street}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  street: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              placeholder="City"
              className="input input-bordered w-full"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="State"
              className="input input-bordered w-full"
              value={shippingAddress.state}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  state: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              placeholder="ZIP Code"
              className="input input-bordered w-full"
              value={shippingAddress.zipCode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  zipCode: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              placeholder="Country"
              className="input input-bordered w-full"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
          <select
            className="select select-bordered w-full"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="credit_card">Credit Card</option>
            <option value="debit_card">Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;