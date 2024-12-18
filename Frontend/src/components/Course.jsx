import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaFilter, FaSort, FaTimes } from "react-icons/fa";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

const FilterButton = ({ active, onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      active
        ? "bg-pink-500 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-200 dark:hover:bg-slate-600"
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
      result = result.filter(item => item.category === selectedGenre);
    }
    
    if (priceRange !== "all") {
      switch(priceRange) {
        case "0-10":
          result = result.filter(item => item.price >= 0 && item.price <= 10);
          break;
        case "11-20":
          result = result.filter(item => item.price > 10 && item.price <= 20);
          break;
        case "21+":
          result = result.filter(item => item.price > 20);
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
    { value: "21+", label: "$21+" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-8 lg:px-20 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6 dark:text-white">
            Discover Your Next{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              Favorite Book
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
            Explore our carefully curated collection of books across various genres.
            Find your perfect read from our extensive library of titles.
          </p>
        </motion.div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
          >
            {showFilters ? (
              <><FaTimes /> Hide Filters</>
            ) : (
              <><FaFilter /> Show Filters</>
            )}
          </button>
        </div>

        {/* Filters Section */}
        <div className={`md:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Genre Filters */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Genre
                </h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map(genre => (
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

              {/* Price Range Filters */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Price Range
                </h3>
                <div className="flex flex-wrap gap-2">
                  {priceRanges.map(range => (
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
        </div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 dark:text-gray-300">
                  Showing {filteredBooks.length} results
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredBooks.map((item) => (
                  <div key={item._id} className="flex justify-center">
                    <div className="w-full max-w-sm">
                      <Cards item={item} />
                    </div>
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