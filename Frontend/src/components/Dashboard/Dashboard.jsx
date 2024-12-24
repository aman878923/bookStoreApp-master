import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Orders from "./Orders";
import Settings from "./Settings";
import { useEffect } from "react";
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      setLoading(false);
    }
  }, [authUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <Profile user={authUser} />;
      case "orders":
        return <Orders />;
      case "settings":
        return <Settings />;
      default:
        return <Profile user={authUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                  {authUser?.fullname?.charAt(0)}
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                  {authUser?.fullname}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{authUser?.email}</p>
              </div>
              <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
            </div>
          </div>

          <div className="md:w-3/4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              <div className="border-b pb-4 mb-4 dark:border-gray-700">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </h1>
              </div>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;