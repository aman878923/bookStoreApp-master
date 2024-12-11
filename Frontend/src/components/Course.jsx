import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link } from "react-router-dom";

function Course() {
  const [book, setBook] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(
          "https://bookstoreapp-master.onrender.com/book"
        );
        setBook(res.data);
        setFilteredBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    getBook();
  }, []);

  useEffect(() => {
    let result = [...book];
    
    // Filter by genre
    if (selectedGenre !== "all") {
      result = result.filter(item => item.category === selectedGenre);
    }
    
    // Filter by price
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

  return (
    <div className="min-h-screen dark:bg-slate-900">
      <div className="max-w-screen-2xl container mx-auto px-4 md:px-8 lg:px-20 pt-24 pb-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 dark:text-white">
            Welcome to Our <span className="text-pink-500">Book Collection</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
            A curated collection of books across various genres. 
            Whether you're looking for fiction, non-fiction, or educational materials, 
            we have something for every reader.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-pink-500 text-white px-8 py-3 rounded-lg 
                     hover:bg-pink-600 transition duration-300 ease-in-out
                     transform hover:-translate-y-1"
          >
            Back to Home
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <div className="flex items-center gap-2">
            <label className="text-gray-700 dark:text-gray-300">Genre:</label>
            <select 
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="p-2 rounded-lg border dark:bg-slate-800 dark:text-white"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-gray-700 dark:text-gray-300">Price Range:</label>
            <select 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="p-2 rounded-lg border dark:bg-slate-800 dark:text-white"
            >
              <option value="all">All Prices</option>
              <option value="0-10">$0 - $10</option>
              <option value="11-20">$11 - $20</option>
              <option value="21+">$21+</option>
            </select>
          </div>
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
      </div>
    </div>
  );
}

export default Course;