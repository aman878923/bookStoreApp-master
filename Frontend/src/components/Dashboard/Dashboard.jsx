import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import Orders from "./Orders";
import Settings from "./Settings";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const { authUser } = useAuth();

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
          {/* Sidebar */}
          <div className="md:w-1/4">
            <Sidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
