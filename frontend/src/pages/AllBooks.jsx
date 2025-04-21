import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-all-books");
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-600 drop-shadow-sm mb-2">
             All Books
          </h1>
          <p className="text-gray-500 text-md max-w-xl mx-auto">
            Dive into a world of stories – explore our full book collection!
          </p>
          <hr className="mt-6 border-t-2 border-blue-200 w-24 mx-auto" />
        </div>

        {!Data ? (
          <div className="flex items-center justify-center mt-20">
            <Loader />
          </div>
        ) : (
          <div className="bg-blue-100 border border-gray-200 rounded-2xl shadow-md p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {Data.map((item, i) => (
                <BookCard key={i} data={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
