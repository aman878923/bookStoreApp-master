import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Cards({ item }) {
  const { addToCart } = useAuth();

  const handleAddToCart = () => {
    addToCart(item._id);
    toast.success("Item added to cart");
  };

  return (
    <div className="w-full">
      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 h-[400px] flex flex-col overflow-hidden">
        {/* Image Container */}
        <div className="relative h-[60%] overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
          <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
            {item.category}
          </span>
        </div>

        {/* Content Container */}
        <div className="flex-1 p-5 flex flex-col">
          <h2 className="font-bold text-gray-800 dark:text-white text-lg mb-2 line-clamp-2">
            {item.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 flex-1">
            {item.title}
          </p>

          {/* Price and Actions */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
              ${item.price}
            </span>
            <div className="flex gap-2">
              <button 
                onClick={handleAddToCart}
                className="px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded-full hover:bg-pink-600 dark:hover:bg-pink-600 transition-colors duration-300"
              >
                Add to Cart
              </button>
              <Link 
                to={`/buy/${item._id}`}
                className="px-3 py-1.5 bg-pink-500 text-white text-sm font-medium rounded-full hover:bg-pink-600 transition-colors duration-300"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
