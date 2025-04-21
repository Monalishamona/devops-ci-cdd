import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-50 to-white pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 drop-shadow mb-3">
             About BookNook
          </h1>
          <p className="text-blue-900 text-base sm:text-lg max-w-2xl mx-auto">
            Where stories begin — for readers, sellers, and authors alike.
          </p>
          <hr className="mt-6 border-t-2 border-blue-300 w-28 mx-auto" />
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto bg-white bg-opacity-80 rounded-2xl shadow-xl p-6 sm:p-10 border border-blue-200">
          {[
            "Welcome to The BookNook — your go-to place for discovering, sharing, and selling books. Whether you're an avid reader or a passionate author, BookNook connects you with a world of stories.",
            "Every book holds a world within it, and at BookNook, we believe in making those worlds accessible. Our mission is to bridge the gap between readers and writers with an intuitive and welcoming platform.",
            "We offer a safe, simple, and enjoyable experience to buy, sell, and explore books. More than a marketplace, BookNook is a thriving community built around the love of reading.",
            "Whether you’re here to shop, share, or just browse, you belong in our community. Let’s discover, connect, and celebrate the magic of books together. 💙"
          ].map((text, i) => (
            <p
              key={i}
              className="text-gray-800 text-base sm:text-lg leading-relaxed mb-6 last:mb-0"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
