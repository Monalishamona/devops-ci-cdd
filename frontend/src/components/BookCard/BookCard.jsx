import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );
      alert(response.data.message || "Removed from favourites");
      window.location.reload(); // Can be improved by lifting state
    } catch (err) {
      console.error("Failed to remove from favourites:", err);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-xs mx-auto flex flex-col justify-between">
      <Link to={`/view-book-details/${data._id}`} className="w-full">
        <div className="rounded-t-2xl overflow-hidden h-48 flex items-center justify-center bg-gray-100">
          <img
            src={data.url}
            alt={data.title}
            className="object-contain h-full w-full transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="px-4 py-3 space-y-1 text-center">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{data.title}</h2>
          <p className="text-sm text-gray-500 truncate">by {data.author}</p>
          <p className="text-md font-bold text-blue-600">₹ {data.price}</p>
        </div>
      </Link>

      {favourite && (
        <div className="px-4 pb-4 mt-2">
          <button
            onClick={handleRemoveBook}
            className="w-full bg-red-100 text-red-600 hover:bg-red-200 border border-red-300 py-2 rounded-lg text-sm font-semibold transition"
          >
            ❤️ Remove from Favourite
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
