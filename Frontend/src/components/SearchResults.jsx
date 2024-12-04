import React from "react";
import Cards from "./Cards";

function SearchResults({ searchResults }) {
  console.log("Rendering search results:", searchResults);

  return (
    <div className="container mx-auto px-4 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {searchResults.map((book) => (
          <Cards key={book._id} item={book} />
        ))}
      </div>
    </div>
  );
}
export default SearchResults;