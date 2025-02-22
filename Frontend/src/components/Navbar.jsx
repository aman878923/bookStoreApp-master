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
      className="w-full bg-gray-50/80 dark:bg-slate-700/80 border-0 rounded-full py-2.5 pl-6 pr-12 focus:ring-2 focus:ring-pink-500 dark:text-white dark:placeholder-gray-400 focus:outline-none shadow-sm"
      placeholder="Search books..."
      value={searchTerm}
      onChange={onSearch}
      onKeyPress={(e) => e.key === "Enter" && onSearchClick()}
      autoComplete="off"
    />
    <button
      onClick={onSearchClick}
      className="absolute right-3 text-gray-400 hover:text-pink-500 transition-colors duration-200"
    >
      <FaSearch className="w-4 h-4" />
    </button>
  </div>
);

function Navbar() {
  const navigate = useNavigate();
  const { authUser, theme, toggleTheme } = useAuth();
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
    ...(authUser
      ? [
          { to: "/cart", label: "Cart" },
          { to: "/dashboard", label: "Dashboard" },
        ]
      : []),
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        sticky
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg shadow-lg"
          : "bg-white dark:bg-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-gray-500 hover:text-pink-500 hover:bg-gray-100/80 dark:hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-pink-500 md:hidden transition-all duration-200"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text hover:opacity-80 transition-opacity">
                bookWonder
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <div className="w-72">
              <SearchBar
                searchTerm={searchTerm}
                onSearch={handleSearch}
                onSearchClick={handleSearchClick}
              />
            </div>
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-700 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 font-medium transition-colors duration-200 text-sm uppercase tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-5">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-gray-100/80 dark:hover:bg-slate-800/80 transition-all duration-200"
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
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <FaUser className="h-4 w-4" />
                  <span className="font-medium">Login</span>
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
        <div className="px-4 pt-2 pb-6 space-y-4 bg-gray-50/80 dark:bg-slate-800/80 backdrop-blur-lg">
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
              className="block px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 font-medium rounded-lg hover:bg-gray-100/80 dark:hover:bg-slate-700/80 transition-all duration-200 text-sm uppercase tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center justify-between px-4 pt-4 border-t dark:border-slate-700/80">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-gray-100/80 dark:hover:bg-slate-700/80 transition-all duration-200"
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
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <FaUser className="h-4 w-4" />
                <span className="font-medium">Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
