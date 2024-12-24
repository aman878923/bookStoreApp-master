import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import About from "./components/About";
import Contact from "./components/Contact";
import Buy from "./components/Buy";
import { AuthProvider, useAuth } from "./context/AuthProvider.jsx";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import SearchResults from "./components/SearchResults";

function App() {
  const { authUser } = useAuth();

  return (
    <div className="min-h-screen dark:bg-slate-900 dark:text-white">
      <Navbar />
      <Login />
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
          <Route
            path="/dashboard"
            element={authUser ? <Dashboard /> : <Navigate to="/signup" />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
