import mongoose from 'mongoose';
import Book from '../model/book.model.js';

const freeBooks = [
    {
      name: "Learn JavaScript Basics",
      price: 0,
      category: "Free",
      image: "https://m.media-amazon.com/images/I/51HbNW6RPhL.jpg",
      title: "Master JavaScript fundamentals with practical examples"
    },
    {
      name: "Python for Beginners",
      price: 0,
      category: "Free",
      image: "https://m.media-amazon.com/images/I/71PpYvxwB+L._AC_UF1000,1000_QL80_.jpg",
      title: "Start your programming journey with Python"
    },
    {
      name: "Web Development Guide",
      price: 0,
      category: "Free",
      image: "https://m.media-amazon.com/images/I/61-F+by9+fL._AC_UF1000,1000_QL80_.jpg",
      title: "Complete guide to modern web development"
    },
    {
      name: "Data Structures 101",
      price: 0,
      category: "Free",
      image: "https://m.media-amazon.com/images/I/61P3-ofH0ML._AC_UF1000,1000_QL80_.jpg",
      title: "Essential data structures concepts explained"
    },
    {
      name: "Introduction to AI",
      price: 0,
      category: "Free",
      image: "https://m.media-amazon.com/images/I/71RLz+cYHdL._AC_UF1000,1000_QL80_.jpg",
      title: "Basic concepts of Artificial Intelligence"
    }
];

const seedFreeBooks = async () => {
    try {
        const existingFreeBooks = await Book.find({ category: "Free" });
        
        if (existingFreeBooks.length === 0) {
            await Book.insertMany(freeBooks);
            console.log('Free books data successfully seeded');
        } else {
            console.log('Free books already exist in database');
        }
    } catch (error) {
        console.error('Error seeding free books:', error);
    }
};

export default seedFreeBooks;
