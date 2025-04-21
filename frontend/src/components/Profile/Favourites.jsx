import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from "../BookCard/BookCard";
import { Link } from 'react-router-dom';

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    fetchFavouriteBooks();
  }, []);

  const fetchFavouriteBooks = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v1/get-favourite-books", { headers });
      setFavouriteBooks(response.data.data || []);
    } catch (error) {
      console.error("Error fetching favourite books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = (id) => {
    setFavouriteBooks(prev => prev.filter(book => book._id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-800 flex items-center">
            <span className="text-red-500 mr-2">❤️</span> My Favourites
          </h1>
          {/* <Link
            to="/all-books"
            className="flex items-center sm:hidden md:hidden gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
          >
            <span>Browse More Books</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link> */}
        </div>

        {favouriteBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl shadow-lg">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/9374/9374324.png" 
              alt="Empty favourites" 
              className="w-32 h-32 mb-6 opacity-80"
            />
            <h3 className="text-2xl font-medium text-gray-700 mb-2">Your Favourites List is Empty</h3>
            <p className="text-gray-500 mb-6">Save your favorite books to find them easily later</p>
            <Link
              to="/all-books"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-all"
            >
              Explore Books
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favouriteBooks.map((item) => (
              <BookCard 
                key={item._id} 
                data={item} 
                favourite={true} 
                onRemove={handleRemove} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
