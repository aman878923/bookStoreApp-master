import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://bookstoreapp-master.onrender.com/order/my-orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('Token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">My Orders</h2>
      
      {loading ? (
        <div className="text-center">Loading orders...</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-lg dark:text-white">
                    Order #{order._id}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="mt-2 font-semibold dark:text-white">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 border-t dark:border-gray-600 pt-4">
                <h4 className="font-medium mb-2 dark:text-white">Items</h4>
                {order.books.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm dark:text-gray-300">
                    <span>{item.book.name}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 border-t dark:border-gray-600 pt-4">
                <h4 className="font-medium mb-2 dark:text-white">Shipping Address</h4>
                <p className="text-sm dark:text-gray-300">
                  {order.shippingAddress.street}, {order.shippingAddress.city}<br />
                  {order.shippingAddress.state}, {order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
