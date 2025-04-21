import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="min-h-[75vh] flex flex-col md:flex-row items-center justify-center bg-white pt-16 md:pt-0 px-4">
      {/* Left Section */}
      <div className="w-full px-4 md:px-0 mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
        
        <h1 className="text-4xl  sm:text-5xl font-extrabold text-blue-500   drop-shadow mb-3">
        Discover Your Next Great Read
          </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-[600px]">
          Explore a world of knowledge, adventure, and inspiration with our curated collection of books. Whether you're into fiction, wisdom, or thrilling stories, there's something here for everyone. Start your journey today and uncover the magic within the pages.
        </p>
        <div className="mt-8">
          <Link 
            to="/all-books" 
            className="text-white text-xl lg:text-2xl font-semibold bg-blue-600 px-10 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Explore Books
          </Link>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="w-full lg:w-3/6 flex justify-center items-center px-4 md:px-0">
        <img 
          className="max-w-full h-auto object-contain rounded-lg shadow-md" 
          src="/book.png" 
          alt="Hero"
        />
      </div>
    </div>
  );
}

export default Hero;
