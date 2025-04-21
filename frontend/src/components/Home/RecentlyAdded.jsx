import React, { useEffect, useState } from 'react';
import axios from "axios";
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-recent-books");
      setData(response.data.data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white shadow-lg rounded-lg">
        
        {/* Heading Section */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-extrabold text-blue-600 tracking-tight drop-shadow-md'>Recently Added Books</h1>
          <hr className='border-gray-300 mt-4 w-1/4 mx-auto' />
          <br></br>
        </div>

        {/* Loader */}
        {!data && (
          <div className="flex items-center justify-center py-20">
            <Loader />
          </div>
        )}

        {/* Book Cards Grid */}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((item, i) => (
              <div key={i}>
                <BookCard data={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyAdded;
