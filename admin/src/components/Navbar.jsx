import React from 'react';
import ThemeToggle from "./ThemeToggle";
import "../style/theme.css";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-gray-800 dark:to-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu button and branding */}
          <div className="flex items-center">
            <button className="lg:hidden mr-4 text-white hover:text-gray-200 transition-colors" aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
            <span className="self-center text-2xl font-bold text-white">BookStore Admin</span>
          </div>

          {/* Center - Search Bar (hidden on smaller screens) */}
          <div className="flex-1 hidden lg:flex justify-center">
            <div className="relative w-full max-w-lg">
              <input 
                type="text" 
                className="w-full rounded-full py-2 px-4 pl-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300" 
                placeholder="Search..." 
                aria-label="Search" 
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Right side - Icons and ThemeToggle */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-indigo-500 transition-colors text-white" aria-label="View notifications">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                />
              </svg>
            </button>

            <ThemeToggle />

            <div className="relative">
              <button className="flex items-center gap-2 hover:bg-indigo-500 p-2 rounded-full transition-colors" aria-label="Open user menu">
                <img 
                  className="w-8 h-8 rounded-full border-2 border-white" 
                  src="https://ui-avatars.com/api/?name=Admin+User" 
                  alt="Admin User profile" 
                />
              </button>
              {/* Optionally, add a dropdown for user options here */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
