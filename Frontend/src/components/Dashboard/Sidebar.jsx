import React from 'react';
import { FaUser, FaShoppingBag, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { authUser, setAuthUser } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'orders', label: 'Orders', icon: <FaShoppingBag /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('Token');
    localStorage.removeItem('Users');
    setAuthUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            activeSection === item.id
              ? 'bg-pink-500 text-white'
              : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200'
          }`}
        >
          {item.icon}
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
      
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 mt-6"
      >
        <FaSignOutAlt />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;