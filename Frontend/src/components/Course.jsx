import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFilter, FaSort, FaTimes } from "react-icons/fa";
import Cards from "./Cards";
import axios from "axios";

const FilterButton = ({ active, onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.05, backgroundColor: active ? "" : "#f3f4f6" }}
    whileTap={{ scale: 0.95 }}
    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
      active
        ? "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl"
        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-lg border-2 border-gray-100 dark:border-gray-700"
    }`}
    onClick={onClick}
  >
    {children}
  </motion.button>
);

function Course() {
  const [book, setBook] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const getBook = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://bookstoreapp-master.onrender.com/book"
        );
        setBook(res.data);
        setFilteredBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getBook();
  }, []);

  useEffect(() => {
    let result = [...book];

    if (selectedGenre !== "all") {
      result = result.filter((item) => item.category === selectedGenre);
    }

    if (priceRange !== "all") {
      switch (priceRange) {
        case "0-10":
          result = result.filter((item) => item.price >= 0 && item.price <= 10);
          break;
        case "11-20":
          result = result.filter((item) => item.price > 10 && item.price <= 20);
          break;
        case "21+":
          result = result.filter((item) => item.price > 20);
          break;
        default:
          break;
      }
    }

    setFilteredBooks(result);
  }, [selectedGenre, priceRange, book]);

  const genres = ["all", "Fiction", "Non-Fiction", "Educational", "Free"];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-10", label: "$0 - $10" },
    { value: "11-20", label: "$11 - $20" },
    { value: "21+", label: "$21+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-screen-2xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed">
            Explore our carefully curated collection of books across various
            genres. Find your perfect read from our extensive library of titles.
          </p>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-3 p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-700"
          >
            {showFilters ? <FaTimes className="text-xl" /> : <FaFilter className="text-xl" />}
            <span className="font-medium">{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </motion.button>
        </div>

        {/* Filters Section */}
        <motion.div
          className={`md:block ${showFilters ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-10 rounded-3xl shadow-xl mb-12 border-2 border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row md:items-start gap-12">
              <div className="flex-1 space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Genre
                </h3>
                <div className="flex flex-wrap gap-4">
                  {genres.map((genre) => (
                    <FilterButton
                      key={genre}
                      active={selectedGenre === genre}
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </FilterButton>
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Price Range
                </h3>
                <div className="flex flex-wrap gap-4">
                  {priceRanges.map((range) => (
                    <FilterButton
                      key={range.value}
                      active={priceRange === range.value}
                      onClick={() => setPriceRange(range.value)}
                    >
                      {range.label}
                    </FilterButton>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-10">
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                  Showing {filteredBooks.length} results
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
                {filteredBooks.map((item) => (
                  <motion.div 
                    key={item._id} 
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Cards item={item} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Course;
