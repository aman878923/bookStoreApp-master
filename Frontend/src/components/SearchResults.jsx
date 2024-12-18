import React from "react";
import { useLocation } from "react-router-dom";
import Cards from "./Cards";

function SearchResults() {
  const location = useLocation();
  const { results = [], searchTerm = "" } = location.state || {};

  if (!results || results.length === 0) {
    return (
      <div className="container mx-auto px-4 mt-20">
        <h2 className="text-2xl font-semibold mb-4">
          Search Results for "{searchTerm}"
        </h2>
        <p className="text-center text-xl text-gray-600 dark:text-gray-400">
          No books found matching your search.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-20">
      <h2 className="text-2xl font-semibold mb-6">
        Search Results for "{searchTerm}"
      </h2>
      <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-lg dark:bg-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((book) => (
            <Cards key={book._id} item={book} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
