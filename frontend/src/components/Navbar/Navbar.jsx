import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines, FaTimes } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const baseLinks = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" }
  ];

  // Filter links based on authentication and role
  let links = [...baseLinks];
  
  if (!isLoggedIn) {
    links.splice(3, 3); // Remove Cart, Profile, and Admin Profile for logged out users
  } 
  else if (role === "user") {
    links.splice(5, 1); // Remove Admin Profile for regular users
  } 
  else if (role === "admin") {
    links.splice(3, 2); // Remove Cart for admin users
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-slate-900 text-white shadow-md px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-12 mr-4"
            src="https://cdn-icons-png.flaticon.com/512/5832/5832416.png"
            alt="logo"
          />
          <Link className="text-2xl font-semibold text-white" to="/">The BookNook</Link>
        </div>

        <div className="nav-links-bookheaven hidden md:flex items-center gap-6">
          {links.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className={`hover:text-blue-200 transition-all duration-300 ${
                (item.title === "Profile" || item.title === "Admin Profile") ? 
                "border border-blue-200 px-3 py-2 rounded" : ""
              }`}
            >
              {item.title}
            </Link>
          ))}

          {!isLoggedIn && (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-200 rounded hover:bg-blue-200 hover:text-slate-800 transition-all duration-300"
              >
                LogIn
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 hover:text-white transition-all duration-300"
              >
                SignUp
              </Link>
            </div>
          )}
        </div>

        <button
          className="block md:hidden text-2xl hover:text-blue-300"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        >
          {mobileNavOpen ? <FaTimes /> : <FaGripLines />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-blue-600 bg-opacity-90 transition-transform duration-500 z-40 flex flex-col items-center justify-start pt-32 transform ${mobileNavOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {links.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            onClick={() => setMobileNavOpen(false)}
            className={`text-white text-3xl font-semibold mb-8 hover:text-blue-200 transition-all duration-300 ${
              (item.title === "Profile" || item.title === "Admin Profile") ? 
              "border border-blue-200 px-6 py-2 rounded" : ""
            }`}
          >
            {item.title}
          </Link>
        ))}

        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              className="px-6 text-3xl py-2 mb-8 border border-blue-200 rounded hover:bg-blue-200 hover:text-slate-800 transition-all duration-300"
              onClick={() => setMobileNavOpen(false)}
            >
              LogIn
            </Link>
            <Link
              to="/signup"
              className="px-6 text-3xl py-2 mb-8 bg-blue-500 rounded hover:bg-blue-700 hover:text-white transition-all duration-300"
              onClick={() => setMobileNavOpen(false)}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
