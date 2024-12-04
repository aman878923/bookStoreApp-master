import React from "react";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(
        "https://bookstoreapp-master.onrender.com/contact/send",
        data
      );
      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="min-h-screen dark:bg-slate-900 pt-8">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-pink-500 mb-4">
              Contact BookWonder
            </h1>
            <p className="text-lg dark:text-gray-300">
              We're here to help with your literary needs
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 mb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:text-white"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">Required</span>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:text-white"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      Valid email required
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-white mb-2">
                  Subject
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:text-white"
                  {...register("subject", { required: true })}
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="delivery">Delivery Status</option>
                  <option value="returns">Returns & Refunds</option>
                  <option value="bulk">Bulk Orders</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>

              <div>
                <label className="block text-gray-700 dark:text-white mb-2">
                  Order Number (Optional)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:text-white"
                  {...register("orderNumber")}
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-white mb-2">
                  Message
                </label>
                <textarea
                  className="w-full px-4 py-2 border rounded-md dark:bg-slate-700 dark:text-white"
                  rows="5"
                  {...register("message", { required: true })}
                ></textarea>
                {errors.message && (
                  <span className="text-red-500 text-sm">Required</span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-3 px-4 rounded-md hover:bg-pink-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-3 text-pink-500">
                Customer Support
              </h3>
              <p className="dark:text-gray-300">support@bookwonder.com</p>
              <p className="dark:text-gray-300">Mon-Fri: 9AM-6PM</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-3 text-pink-500">
                Bulk Orders
              </h3>
              <p className="dark:text-gray-300">bulk@bookwonder.com</p>
              <p className="dark:text-gray-300">+1 (555) 123-4567</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-3 text-pink-500">
                Store Location
              </h3>
              <p className="dark:text-gray-300">123 Book Street</p>
              <p className="dark:text-gray-300">Reading City, RC 12345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
