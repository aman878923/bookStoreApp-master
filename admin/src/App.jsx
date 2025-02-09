import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRegistration from "./components/AdminRegistration";

import "./App.css";
import Dashboard from "./dashboard/dashboard";

import Layout from "./components/Layout";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    // <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<AdminRegistration/>} />
            {/* Other admin routes */}
          </Routes>
        </Layout>
      </Router>
    // </ThemeProvider>
  );
}

export default App;
