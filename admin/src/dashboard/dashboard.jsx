import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [bookCount, setBookCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const responses = await Promise.all([
          axios.get("https://bookstoreapp-master.onrender.com/user/count"),
          axios.get("https://bookstoreapp-master.onrender.com/book/count"),
          axios.get("https://bookstoreapp-master.onrender.com/order/count"),
          axios.get("https://bookstoreapp-master.onrender.com/order/revenue"),
          axios.get("https://bookstoreapp-master.onrender.com/order/recent"),
          axios.get("https://bookstoreapp-master.onrender.com/user/recent"),
        ]);

        setUserCount(responses[0].data.count);
        setBookCount(responses[1].data.count);
        setOrderCount(responses[2].data.count);
        setRevenue(responses[3].data);
        setRecentOrders(responses[4].data);
        setRecentUsers(responses[5].data);

        const revenueData = responses[3].data;
        setChartData({
          labels: revenueData.map((item) => `Month ${item._id.month}`),
          datasets: [
            {
              label: "Revenue",
              data: revenueData.map((item) => item.amount),
              backgroundColor: "rgba(79, 70, 229, 0.2)",
              borderColor: "rgba(79, 70, 229, 1)",
              borderWidth: 2,
              tension: 0.3,
              fill: true,
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching counts:", error);
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <h1 className="text-3xl font-bold text-indigo-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-600">Total Users</h2>
            <span className="p-2 bg-blue-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-800">{userCount}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-600">Total Books</h2>
            <span className="p-2 bg-green-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-800">{bookCount}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-600">Total Orders</h2>
            <span className="p-2 bg-purple-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </span>
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-800">{orderCount}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
          <div className="mb-2">
            <h2 className="text-sm font-semibold text-gray-600">
              Revenue Overview
            </h2>
          </div>
          {chartData && (
            <div className="h-32">
              <Line
                data={chartData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        maxTicksLimit: 5,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-4 text-left text-sm font-medium text-gray-600">
                    Order ID
                  </th>
                  <th className="pb-4 text-left text-sm font-medium text-gray-600">
                    User
                  </th>
                  <th className="pb-4 text-left text-sm font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="pb-4 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 text-sm text-gray-600">
                      {order._id.slice(-6)}
                    </td>
                    <td className="py-4 text-sm text-gray-600">
                      {order.user?.email}
                    </td>
                    <td className="py-4 text-sm font-medium text-gray-800">
                      ${order.totalAmount}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Recent Users
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-4 text-left text-sm font-medium text-gray-600">
                    User ID
                  </th>
                  <th className="pb-4 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="pb-4 text-left text-sm font-medium text-gray-600">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 text-sm text-gray-600">
                      {user._id.slice(-6)}
                    </td>
                    <td className="py-4 text-sm text-gray-800 font-medium">
                      {user.fullname}
                    </td>
                    <td className="py-4 text-sm text-gray-600">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
