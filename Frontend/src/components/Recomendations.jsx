import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from "../context/AuthProvider";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await axios.get(`https://bookstoreapp-master.onrender.com/api/recommendations/${user._id}`);
        setRecommendations(response.data.recommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  if (loading) return <div className="flex justify-center p-4">Loading recommendations...</div>;
  
  if (!user) return <div className="p-4">Sign in to see personalized recommendations</div>;
  
  if (recommendations.length === 0) {
    return <div className="p-4">Browse more books to get personalized recommendations!</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {recommendations.map(book => (
          <div key={book._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img 
              src={book.coverImage || '/default-book-cover.jpg'} 
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="font-semibold text-sm truncate">{book.title}</h3>
              <p className="text-xs text-gray-600 truncate">{book.author}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm font-bold">${book.price}</span>
                <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
