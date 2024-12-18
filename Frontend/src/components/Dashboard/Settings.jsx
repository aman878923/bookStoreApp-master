import React from 'react';
import { FaBell, FaMoon, FaLock } from 'react-icons/fa';

const Settings = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold dark:text-white">Settings</h2>

      {/* Notifications */}
      <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaBell className="text-pink-500" />
          <h3 className="text-lg font-semibold dark:text-white">Notifications</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
            <input type="checkbox" className="toggle toggle-pink" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Order Updates</span>
            <input type="checkbox" className="toggle toggle-pink" defaultChecked />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Newsletter</span>
            <input type="checkbox" className="toggle toggle-pink" />
          </label>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaMoon className="text-pink-500" />
          <h3 className="text-lg font-semibold dark:text-white">Appearance</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
            <input type="checkbox" className="toggle toggle-pink" />
          </label>
        </div>
      </div>

      {/* Security */}
      <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FaLock className="text-pink-500" />
          <h3 className="text-lg font-semibold dark:text-white">Security</h3>
        </div>
        <div className="space-y-4">
          <button className="w-full text-left px-4 py-2 bg-white dark:bg-slate-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-500 transition-colors">
            Change Password
          </button>
          <button className="w-full text-left px-4 py-2 bg-white dark:bg-slate-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-500 transition-colors">
            Two-Factor Authentication
          </button>
          <button className="w-full text-left px-4 py-2 bg-white dark:bg-slate-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-500 transition-colors">
            Connected Devices
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
