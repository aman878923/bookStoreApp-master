import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!authUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `https://bookstoreapp-master.onrender.com/api/recommendations/${authUser._id}`
        );
        setRecommendations(response.data.recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [authUser]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px] p-8">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Finding books for you...</p>
        </div>
      </div>
    );

  if (!authUser)
    return (
      <div className="p-8 text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl shadow-sm my-6 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Personalized Recommendations</h3>
        <p className="text-lg text-gray-700 mb-4">
          Sign in to discover books tailored just for you
        </p>
        <Link to="/login" className="inline-block px-6 py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md">
          Sign In Now
        </Link>
      </div>
    );

  if (recommendations.length === 0) {
    return (
      <div className="p-8 text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl shadow-sm my-6 max-w-4xl mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <h3 className="text-xl font-bold text-gray-800 mb-3">No Recommendations Yet</h3>
        <p className="text-lg text-gray-700 mb-4">
          Browse our collection to help us understand your reading preferences
        </p>
        <Link to="/books" className="inline-block px-6 py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-105 shadow-md">
          Explore Books
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-xl shadow-sm my-6">
      <div className="flex items-center mb-8 border-b pb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          Recommended for You
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {recommendations.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            <div className="relative group">
              <img
                src={book.image || "/default-book-cover.jpg"}
                alt={book.title}
                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-3 right-3">
                <span className="bg-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md text-pink-600">
                  ${book.price}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-800 mb-2 line-clamp-1 text-lg">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-1 italic">
                by {book.author}
              </p>
              <Link
                to={`/buy/${book._id}`}
                className="w-full block text-center px-4 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-sm"
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
