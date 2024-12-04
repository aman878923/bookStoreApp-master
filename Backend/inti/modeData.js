import mongoose from 'mongoose';
import Book from '../model/book.model.js';

const paidBooks = [
    {
      name: "To Kill a Mockingbird",
      price: 15.99,
      category: "Fiction",
      image: "https://example.com/image1.jpg",
      title: "A classic novel by Harper Lee"
    },
    {
      name: "The Great Gatsby",
      price: 12.99,
      category: "Fiction",
      image: "https://example.com/image2.jpg",
      title: "A novel by F. Scott Fitzgerald"
    },
    {
      name: "1984",
      price: 10.99,
      category: "Dystopian",
      image: "https://example.com/image3.jpg",
      title: "A classic dystopian novel by George Orwell"
    },
    {
      name: "The Catcher in the Rye",
      price: 9.99,
      category: "Fiction",
      image: "https://example.com/image4.jpg",
      title: "A classic coming-of-age novel by J.D. Salinger"
    },
    {
      name: "The Hitchhiker's Guide to the Galaxy",
      price: 14.99,
      category: "Science Fiction",
      image: "https://example.com/image5.jpg",
      title: "A comedic science fiction series by Douglas Adams"
    }
];

const seedPaidBooks = async () => {
    try {
        const existingPaidBooks = await Book.find({ category: { $ne: "Free" } });
        
        if (existingPaidBooks.length === 0) {
            await Book.insertMany(paidBooks);
            console.log('Paid books data successfully seeded');
        } else {
            console.log('Paid books already exist in database');
        }
    } catch (error) {
        console.error('Error seeding paid books:', error);
    }
};

export default seedPaidBooks;
