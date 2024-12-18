// Frontend/src/components/Banner.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import bannerImg from "/public/Banner.png"; // Import banner image

function Banner() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      // Send welcome email
      await axios.post("https://bookstoreapp-master.onrender.com/contact/welcome-email", {
        email: email
      });

      // Navigate to signup page with email
      navigate("/signup", { state: { email } });
      toast.success("Welcome email sent! Please check your inbox.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/30 to-purple-100/30 dark:from-pink-900/30 dark:to-purple-900/30"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-16 md:py-28 gap-12">
          {/* Left Content */}
          <div className="w-full md:w-1/2 space-y-8 text-center md:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to Our Book Store
              </h1>
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200">
                Learn Something New Everyday!
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-xl leading-relaxed">
              Discover a world of knowledge with our extensive collection of books. 
              Start your learning journey today and unlock new possibilities.
            </p>

            <form onSubmit={handleGetStarted} className="space-y-6 max-w-md">
              <div className="group relative">
                <div className="flex items-center p-2 border-2 rounded-xl dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:border-pink-500 dark:hover:border-pink-400 transition-all duration-300 focus-within:border-pink-500 dark:focus-within:border-pink-400 focus-within:ring-2 focus-within:ring-pink-500/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-400 group-hover:text-pink-500 dark:group-hover:text-pink-400 transition-colors duration-300 mx-2"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="email"
                    className="flex-1 p-2 bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-400"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Get Started"
                )}
              </button>
            </form>
          </div>

          {/* Right Content - Image */}
          <div className="w-full md:w-1/2 transform transition-transform duration-500 hover:scale-105">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-40 transition duration-1000"></div>
              <img
                src={bannerImg}
                alt="Banner illustration"
                className="relative w-full max-w-xl mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;