import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBook, FaShoppingCart, FaTags, FaUsers, FaAward, FaGlobe } from "react-icons/fa";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-all"
  >
    <div className="bg-pink-50 dark:bg-pink-500/10 p-4 rounded-full mb-4">
      <Icon className="w-6 h-6 text-pink-500" />
    </div>
    <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
      {title}
    </h3>
    <p className="dark:text-gray-300">{description}</p>
  </motion.div>
);

const TeamMember = ({ name, role, imageSrc }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg"
  >
    <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 opacity-20"></div>
      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <FaUsers className="w-16 h-16 text-gray-400 dark:text-gray-500" />
      </div>
    </div>
    <h3 className="font-bold text-lg dark:text-white mb-1">{name}</h3>
    <p className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text font-medium">
      {role}
    </p>
  </motion.div>
);

const Stat = ({ icon: Icon, value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-pink-50 dark:bg-pink-500/10 p-4 rounded-full mb-3">
      <Icon className="w-6 h-6 text-pink-500" />
    </div>
    <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text mb-1">
      {value}
    </div>
    <div className="text-gray-600 dark:text-gray-400">{label}</div>
  </div>
);

function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              BookWonder
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your Ultimate Destination for Literary Adventures. Discover stories that
            inspire, educate, and transform.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8"
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
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-16"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
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
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember name="John Doe" role="Founder & CEO" />
            <TeamMember name="Jane Smith" role="Head of Operations" />
            <TeamMember name="Mike Johnson" role="Chief Curator" />
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-8 opacity-90">
            Have questions? We'd love to hear from you and help you find your next
            great read.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-pink-500 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
