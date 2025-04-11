import { useState, useEffect } from "react";
import axios from "axios";
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
      <div className="flex justify-center items-center min-h-[200px] p-6">
        <div className="animate-pulse text-lg text-gray-600">
          Loading recommendations...
        </div>
      </div>
    );

  if (!authUser)
    return (
      <div className="p-6 text-center bg-gray-50 rounded-lg shadow-sm">
        <p className="text-lg text-gray-700">
          Sign in to see personalized recommendations
        </p>
      </div>
    );

  if (recommendations.length === 0) {
    return (
      <div className="p-6 text-center bg-gray-50 rounded-lg shadow-sm">
        <p className="text-lg text-gray-700">
          Browse more books to get personalized recommendations!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Recommended for You
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {recommendations.map((book) => (
          <div
            key={book._id}
            className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={book.image || "/default-book-cover.jpg"}
                alt={book.title}
                className="w-full h-56 object-cover hover:opacity-90 transition-opacity"
              />
              <div className="absolute top-2 right-2">
                <span className="bg-white/90 px-2 py-1 rounded-full text-sm font-semibold shadow-sm">
                  ${book.price}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                {book.author}
              </p>
              <Link
                to={`/buy/${book._id}`}
                className="px-3 py-1.5 bg-pink-500 text-white text-sm font-medium rounded-full hover:bg-pink-600 transition-colors duration-300"
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
