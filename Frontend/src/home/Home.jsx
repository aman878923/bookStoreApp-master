import React from "react";
import { motion } from "framer-motion";
import { FaBook, FaUserGraduate, FaBookReader } from "react-icons/fa";
import Banner from "../components/Banner";
import Freebook from "../components/Freebook";
import Footer from "../components/Footer";

const StatCard = ({ icon: Icon, count, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="p-4 bg-pink-50 dark:bg-pink-500/10 rounded-full mb-4">
      <Icon className="w-8 h-8 text-pink-500" />
    </div>
    <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
      {count}+
    </h3>
    <p className="text-gray-600 dark:text-gray-300 text-center">{label}</p>
  </motion.div>
);

const FeatureSection = () => (
  <section className="py-16 bg-gray-50 dark:bg-slate-900/50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Why Choose bookWonder?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Join thousands of readers who trust bookWonder for their literary journey
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          icon={FaBook}
          count="10,000"
          label="Books Available"
        />
        <StatCard
          icon={FaUserGraduate}
          count="50,000"
          label="Active Readers"
        />
        <StatCard
          icon={FaBookReader}
          count="100,000"
          label="Books Read"
        />
      </div>
    </div>
  </section>
);

const NewsletterSection = () => (
  <motion.section
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="py-16 bg-gradient-to-r from-pink-500 to-purple-500"
  >
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Stay Updated with Latest Books
        </h2>
        <p className="mb-8 opacity-90">
          Subscribe to our newsletter and never miss new book releases and exclusive offers
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-white text-pink-500 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  </motion.section>
);

function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Banner />
      <FeatureSection />
      <Freebook />
      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default Home;
