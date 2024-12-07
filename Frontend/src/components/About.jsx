import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen dark:bg-slate-900 pt-8">
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-pink-500 mb-4">
              About BookStore
            </h1>
            <p className="text-lg dark:text-gray-300">
              Your Ultimate Destination for Literary Adventures
            </p>
          </div>

          {/* Mission Statement */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We're dedicated to connecting readers with their next favorite
              books. Our platform offers a carefully curated selection of titles
              across all genres, making it easy to discover, explore, and
              purchase books that inspire and entertain.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-pink-500">
                Wide Selection
              </h3>
              <p className="dark:text-gray-300">
                Thousands of books across multiple genres and categories
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-pink-500">
                Easy Shopping
              </h3>
              <p className="dark:text-gray-300">
                Simple and secure checkout process for hassle-free purchases
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-3 text-pink-500">
                Best Prices
              </h3>
              <p className="dark:text-gray-300">
                Competitive pricing and regular discounts on popular titles
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              Our Team
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
                <h3 className="font-bold text-lg dark:text-white">John Doe</h3>
                <p className="text-pink-500">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4"></div>
                <h3 className="font-bold text-lg dark:text-white">
                  Jane Smith
                </h3>
                <p className="text-pink-500">Head of Operations</p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Get in Touch
            </h2>
            <p className="dark:text-gray-300 mb-4">
              Have questions? We'd love to hear from you.
            </p>
            <button className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition duration-300">
              <Link to="/contact">Contact Us</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
