import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';

const Checkout = () => {
    const navigate = useNavigate();
    const { authUser, cartItems, clearCart } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    useEffect(() => {
        if (!authUser || !cartItems?.length) {
            navigate('/cart');
        }
    }, [authUser, cartItems, navigate]);

    const calculateTotal = () => {
        return cartItems?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
    
        setIsSubmitting(true);
        try {
            const response = await fetch("https://bookstoreapp-master.onrender.com/order/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("Token")}`,
                },
                body: JSON.stringify({
                    books: cartItems.map(item => ({
                        book: item._id,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    shippingAddress,
                    paymentMethod,
                    totalAmount: calculateTotal()
                }),
            });
    
            const data = await response.json();
            if (data.success) {
                clearCart();
                toast.success('Order placed successfully!');
                navigate(`/order-success/${data.order._id}`);
            }
        } catch (error) {
            toast.error('Error creating order');
            console.error("Order creation failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800">
                    <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries({
                            street: "Street Address",
                            city: "City",
                            state: "State",
                            zipCode: "ZIP Code",
                            country: "Country"
                        }).map(([field, placeholder]) => (
                            <input
                                key={field}
                                type="text"
                                placeholder={placeholder}
                                className="input input-bordered w-full dark:bg-gray-700"
                                value={shippingAddress[field]}
                                onChange={(e) => setShippingAddress(prev => ({
                                    ...prev,
                                    [field]: e.target.value
                                }))}
                                required
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800">
                    <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                    <select
                        className="select select-bordered w-full dark:bg-gray-700"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="credit_card">Credit Card</option>
                        <option value="debit_card">Debit Card</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>

                <div className="bg-white p-6 rounded-lg shadow dark:bg-gray-800">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-2">
                        {cartItems?.map(item => (
                            <div key={item._id} className="flex justify-between items-center py-2">
                                <div>
                                    <h4 className="font-semibold">{item.name}</h4>
                                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                </div>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
                    disabled={isSubmitting || !cartItems?.length}
                >
                    {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
            </form>
        </div>
    );
};

export default Checkout;