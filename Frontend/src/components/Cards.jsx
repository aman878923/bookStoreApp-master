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
    <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-1">
      <div className="w-[250px] h-[280px] mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden dark:bg-slate-800 dark:text-white border-[0.5px] border-gray-200 dark:border-gray-700">
        <div className="relative h-[50%] overflow-hidden group">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
          <div className="absolute top-2 right-2">
            <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md">
              {item.category}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col flex-1 p-4 bg-gradient-to-b from-white to-gray-50 dark:from-slate-800 dark:to-slate-900">
          <h2 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 text-sm leading-tight">
            {item.name}
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 flex-1">
            {item.title}
          </p>
          
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100 dark:border-gray-700">
            <span className="text-base font-bold text-pink-600 dark:text-pink-400">
              ${item.price}
            </span>
            <button 
              onClick={handleAddToCart}
              className="inline-flex items-center justify-center px-4 py-1.5 bg-gray-900 hover:bg-pink-600 text-white text-xs font-medium rounded-full transition-all duration-300 hover:px-5 dark:bg-gray-700"
            >
              Add to Cart
            </button>
            <Link 
              to={`/buy/${item._id}`}
              className="inline-flex items-center justify-center px-4 py-1.5 bg-gray-900 hover:bg-pink-600 text-white text-xs font-medium rounded-full transition-all duration-300 hover:px-5 dark:bg-gray-700"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
