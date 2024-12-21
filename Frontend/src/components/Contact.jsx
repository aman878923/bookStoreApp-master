import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ContactInfo = ({ icon: Icon, title, content }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm"
  >
    <div className="p-3 bg-pink-50 dark:bg-pink-500/10 rounded-full">
      <Icon className="w-6 h-6 text-pink-500" />
    </div>
    <div>
      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
    </div>
  </motion.div>
);

const InputField = ({ label, error, ...props }) => (
  <div>
    <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
      {label}
    </label>
    <input
      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-colors"
      {...props}
    />
    {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
  </div>
);

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "https://bookstoreapp-master.onrender.com/contact",
        data
      );
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get in{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              Touch
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions about our services? We're here to help and answer any
            question you might have.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <ContactInfo
            icon={FaPhone}
            title="Call Us"
            content="+1 (555) 123-4567"
          />
          <ContactInfo
            icon={FaEnvelope}
            title="Email Us"
            content="support@bookwonder.com"
          />
          <ContactInfo
            icon={FaClock}
            title="Working Hours"
            content="Mon - Fri: 9:00 AM - 6:00 PM"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name", { required: "Name is required" })}
                    error={errors.name?.message}
                  />
                  <InputField
                    label="Email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Please enter a valid email",
                      },
                    })}
                    error={errors.email?.message}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    Subject
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-colors"
                    {...register("subject", { required: "Please select a subject" })}
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="delivery">Delivery Status</option>
                    <option value="returns">Returns & Refunds</option>
                    <option value="bulk">Bulk Orders</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                <InputField
                  label="Order Number (Optional)"
                  type="text"
                  placeholder="e.g., ORD-1234"
                  {...register("orderNumber")}
                />

                <div>
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-colors"
                    rows="4"
                    placeholder="How can we help you?"
                    {...register("message", { required: "Message is required" })}
                  ></textarea>
                  {errors.message && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Map or Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 lg:p-12"
          >
            <div className="h-full flex flex-col">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">
                Visit Our Store
              </h2>
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-pink-50 dark:bg-pink-500/10 rounded-full">
                  <FaMapMarkerAlt className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    Store Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    123 Bookstore Street
                    <br />
                    Literary District
                    <br />
                    Reading City, RC 12345
                  </p>
                </div>
              </div>
              <div className="flex-1 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700">
                {/* Replace this div with an actual map component if needed */}
                <div className="w-full h-full min-h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">
                    Map placeholder
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
