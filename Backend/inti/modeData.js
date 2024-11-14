const books = [
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
  
  // You can use the Book model to create new documents
  books.forEach(book => {
    const newBook = new book(book);
    newBook.save((err, book) => {
      if (err) console.error(err);
      console.log(`Book saved: ${book.name}`);
    });
  });