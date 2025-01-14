import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import About from "./components/About";
import Contact from "./components/Contact";
import Buy from "./components/Buy";
import Cart from "./components/Cart"; // Importing Cart component
import { AuthProvider, useAuth } from "./context/AuthProvider.jsx";
import Navbar from "./components/Navbar";
import Login from "./components/Login"; // Importing Login component
import Dashboard from "./components/Dashboard/Dashboard";
import SearchResults from "./components/SearchResults";

import ChatInterface from './components/Chat/ChatInterface';
import ChatButton from "./components/Chat/ChatButton.jsx";
import Checkout from './components/Checkout'; // Importing Checkout component

function App() {
  const { authUser } = useAuth();

  return (
    <div className="min-h-screen dark:bg-slate-900 dark:text-white">
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/bookStoreApp-master"
            element={<Navigate to="/" replace />}
          />
          <Route
            path="/course/*"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/buy/:id" element={<Buy />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} /> {/* Added Cart route */}
          <Route path="/checkout" element={<Checkout />} /> {/* Added Checkout route */}
          <Route path="/login" element={<Login />} /> {/* Added Login route */}
          <Route
            path="/dashboard/*"
            element={
              authUser ? (
                <Dashboard />
              ) : (
                <Navigate to="/signup" state={{ from: location }} />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ChatButton />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
