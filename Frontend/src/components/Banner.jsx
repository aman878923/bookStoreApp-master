// Frontend/src/components/Banner.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import bannerImg from "/public/Banner.png"; // Import banner image

function Banner() {
  const [email, setEmail] = useState("");
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
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-24 gap-8">
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Welcome to Our <span className="text-pink-500">Book Store</span>
            <br />
            <span className="text-2xl md:text-4xl">Learn Something New Everyday!</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-xl">
            Discover a world of knowledge with our extensive collection of books. 
            Start your learning journey today and unlock new possibilities.
          </p>
          <form onSubmit={handleGetStarted} className="space-y-4 max-w-md">
            <div className="flex items-center p-2 border rounded-lg dark:border-gray-600 bg-white dark:bg-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-5 h-5 text-gray-400 mx-2"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                className="flex-1 p-2 bg-transparent outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-200 font-medium"
            >
              Get Started
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={bannerImg}
            alt="Banner illustration"
            className="w-full max-w-xl mx-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;