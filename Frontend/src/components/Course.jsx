import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFilter, FaSort, FaTimes } from "react-icons/fa";
import Cards from "./Cards";
import axios from "axios";

const FilterButton = ({ active, onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
      active
        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:shadow-md border border-gray-200 dark:border-gray-700"
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Discover Your Next Favorite Book
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            Explore our carefully curated collection of books across various
            genres. Find your perfect read from our extensive library of titles.
          </p>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
          >
            {showFilters ? <FaTimes /> : <FaFilter />}
            <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>
          </button>
        </div>

        {/* Filters Section */}
        <motion.div
          className={`md:block ${showFilters ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Genre
                </h3>
                <div className="flex flex-wrap gap-3">
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

              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Price Range
                </h3>
                <div className="flex flex-wrap gap-3">
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
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Showing {filteredBooks.length} results
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
                {filteredBooks.map((item) => (
                  <div key={item._id} className="flex justify-center">
                    <Cards item={item} />
                  </div>
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
