import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBook, FaShoppingCart, FaTags, FaUsers, FaAward, FaGlobe } from "react-icons/fa";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)" }}
    className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-pink-500 border-2 border-transparent"
  >
    <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-500/20 dark:to-purple-500/20 p-5 rounded-full mb-6">
      <Icon className="w-8 h-8 text-pink-500" />
    </div>
    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
      {title}
    </h3>
    <p className="dark:text-gray-300 leading-relaxed">{description}</p>
  </motion.div>
);

const TeamMember = ({ name, role, imageSrc }) => (
  <motion.div
    whileHover={{ y: -8, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.2)" }}
    className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-all duration-300"
  >
    <div className="relative w-40 h-40 mx-auto mb-6 overflow-hidden rounded-full border-4 border-pink-100 dark:border-pink-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 opacity-20"></div>
      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
        <FaUsers className="w-20 h-20 text-gray-400 dark:text-gray-500" />
      </div>
    </div>
    <h3 className="font-bold text-xl dark:text-white mb-2">{name}</h3>
    <p className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text font-semibold">
      {role}
    </p>
  </motion.div>
);

const Stat = ({ icon: Icon, value, label }) => (
  <div className="flex flex-col items-center p-6 hover:transform hover:scale-105 transition-all duration-300">
    <div className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-500/20 dark:to-purple-500/20 p-5 rounded-full mb-4">
      <Icon className="w-8 h-8 text-pink-500" />
    </div>
    <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-2">
      {value}
    </div>
    <div className="text-gray-600 dark:text-gray-400 font-medium">{label}</div>
  </div>
);

function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        {/* Hero Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              BookWonder
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Your Ultimate Destination for Literary Adventures. Discover stories that
            inspire, educate, and transform.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20 bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-10"
        >
          <Stat icon={FaBook} value="10K+" label="Books" />
          <Stat icon={FaUsers} value="50K+" label="Readers" />
          <Stat icon={FaAward} value="99%" label="Satisfaction" />
          <Stat icon={FaGlobe} value="100+" label="Countries" />
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-12 mb-20"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-xl leading-relaxed">
              We're dedicated to connecting readers with their next favorite books.
              Our platform offers a carefully curated selection of titles across
              all genres, making it easy to discover, explore, and purchase books
              that inspire and entertain. We believe in the power of stories to
              transform lives and build bridges between cultures.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-10 mb-20"
        >
          <FeatureCard
            icon={FaBook}
            title="Wide Selection"
            description="Thousands of books across multiple genres and categories, carefully curated for our readers"
          />
          <FeatureCard
            icon={FaShoppingCart}
            title="Easy Shopping"
            description="Simple and secure checkout process with multiple payment options"
          />
          <FeatureCard
            icon={FaTags}
            title="Best Prices"
            description="Competitive pricing with regular discounts and special offers"
          />
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <TeamMember name="John Doe" role="Founder & CEO" />
            <TeamMember name="Jane Smith" role="Head of Operations" />
            <TeamMember name="Mike Johnson" role="Chief Curator" />
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-16 text-white shadow-xl"
        >
          <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you and help you find your next
            great read.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-pink-500 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
