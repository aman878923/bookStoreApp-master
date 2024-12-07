import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import About from "./components/About";
import Contact from "./components/Contact";
import Buy from "./components/Buy";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser] = useAuth(); // Destructure only what's needed

  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookStoreApp-master" element={<Navigate to="/" replace />} />
        <Route
          path="/course/*"
          element={authUser ? <Courses /> : <Navigate to="/signup" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/buy/:id" element={<Buy />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
