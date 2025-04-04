import Book from "../model/book.model.js";
import UserActivity from "../model/userActivity.model.js";

export const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // 1. Get user's genre preferences based on activities
    const userActivities = await UserActivity.find({ userId })
      .populate('bookId', 'genre')
      .sort('-timestamp');
    
    if (userActivities.length === 0) {
      // If no activities, return popular books
      const popularBooks = await Book.find({})
        .sort('-reviews.length')
        .limit(10);
      return res.status(200).json({
        success: true,
        recommendations: popularBooks,
        type: "popular"
      });
    }
    
    // 2. Calculate genre preferences
    const genreCount = {};
    userActivities.forEach(activity => {
      if (activity.bookId && activity.bookId.genre) {
        const genre = activity.bookId.genre;
        
        // Weight different activities
        let weight = 1;
        if (activity.activityType === "purchase") weight = 5;
        if (activity.activityType === "review") weight = 3;
        if (activity.activityType === "wishlist") weight = 2;
        
        // Add rating bonus if available
        if (activity.rating) weight += activity.rating;
        
        genreCount[genre] = (genreCount[genre] || 0) + weight;
      }
    });
    
    // 3. Sort genres by preference
    const preferredGenres = Object.entries(genreCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
    
    // 4. Get books from preferred genres that user hasn't interacted with
    const userBookIds = userActivities.map(activity => 
      activity.bookId ? activity.bookId._id.toString() : null
    ).filter(id => id !== null);
    
    const recommendations = await Book.find({
      genre: { $in: preferredGenres },
      _id: { $nin: userBookIds }
    }).limit(10);
    
    // 5. If not enough recommendations, add some popular books
    if (recommendations.length < 5) {
      const popularBooks = await Book.find({
        _id: { $nin: userBookIds }
      })
      .sort('-reviews.length')
      .limit(10 - recommendations.length);
      
      recommendations.push(...popularBooks);
    }
    
    res.status(200).json({
      success: true,
      recommendations,
      preferredGenres,
      type: "personalized"
    });
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({
      success: false,
      message: "Error generating recommendations",
      error: error.message
    });
  }
};
