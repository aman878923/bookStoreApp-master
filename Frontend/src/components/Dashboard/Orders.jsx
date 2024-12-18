import React from 'react';

const Orders = () => {
  // Placeholder orders data
  const orders = [
    {
      id: '1',
      date: '2023-12-18',
      status: 'Pending',
      total: 29.99,
      items: [{ name: 'Book Title 1', quantity: 1 }]
    },
    {
      id: '2',
      date: '2023-12-17',
      status: 'Delivered',
      total: 49.98,
      items: [{ name: 'Book Title 2', quantity: 2 }]
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">My Orders</h2>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h3 className="font-semibold text-lg dark:text-white">
                  Order #{order.id}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'Delivered' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
                <p className="mt-2 font-semibold dark:text-white">
                  ${order.total.toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="mt-4 border-t dark:border-gray-600 pt-4">
              <h4 className="font-medium mb-2 dark:text-white">Items</h4>
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm dark:text-gray-300">
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              ))}
            </div>
            
            <button className="mt-4 px-4 py-2 text-pink-500 hover:text-pink-600 font-medium">
              View Details →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
