import { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import SearchResults from "./SearchResults";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaSun, FaMoon, FaUser } from "react-icons/fa";

const SearchBar = ({ searchTerm, onSearch, onSearchClick }) => (
  <div className="relative flex items-center">
    <input
      type="text"
      className="w-full bg-gray-50 dark:bg-slate-700 border-0 rounded-full py-2 pl-5 pr-12 focus:ring-2 focus:ring-pink-500 dark:text-white dark:placeholder-gray-400 focus:outline-none"
      placeholder="Search books..."
      value={searchTerm}
      onChange={onSearch}
      onKeyPress={(e) => e.key === "Enter" && onSearchClick()}
      autoComplete="off"
    />
    <button
      onClick={onSearchClick}
      className="absolute right-3 text-gray-400 hover:text-pink-500 transition-colors"
    >
      <FaSearch className="w-4 h-4" />
    </button>
  </div>
);

function Navbar() {
  const navigate = useNavigate();
  const { authUser } = useAuth();
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sticky, setSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearchClick = async () => {
    if (searchTerm.trim()) {
      try {
        const response = await axios.get(
          `https://bookstoreapp-master.onrender.com/book/search?q=${encodeURIComponent(
            searchTerm
          )}`
        );
        navigate("/search", { state: { results: response.data, searchTerm } });
      } catch (error) {
        console.error("Search error:", error);
        navigate("/search", { state: { results: [], searchTerm } });
      }
    }
  };

  useEffect(() => {
    const element = document.documentElement;
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/course", label: "Course" },
    { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
    ...(authUser ? [{ to: "/dashboard", label: "Dashboard" }] : []),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        sticky
          ? "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-pink-500 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500 md:hidden"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                bookWonder
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="w-64">
              <SearchBar
                searchTerm={searchTerm}
                onSearch={handleSearch}
                onSearchClick={handleSearchClick}
              />
            </div>
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-600 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                {theme === "dark" ? (
                  <FaSun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <FaMoon className="h-5 w-5 text-gray-600" />
                )}
              </button>
              {authUser ? (
                <Logout />
              ) : (
                <button
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                >
                  <FaUser className="h-4 w-4" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-3">
          <div className="mb-4">
            <SearchBar
              searchTerm={searchTerm}
              onSearch={handleSearch}
              onSearchClick={handleSearchClick}
            />
          </div>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block px-4 py-2 text-gray-600 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 font-medium rounded-md hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center justify-between px-4 pt-4 border-t dark:border-slate-700">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              {theme === "dark" ? (
                <FaSun className="h-5 w-5 text-yellow-400" />
              ) : (
                <FaMoon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            {authUser ? (
              <Logout />
            ) : (
              <button
                onClick={() => {
                  document.getElementById("my_modal_3").showModal();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors"
              >
                <FaUser className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
