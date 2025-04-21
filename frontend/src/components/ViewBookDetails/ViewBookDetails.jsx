import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { MdFavorite } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (err) {
        setError('Failed to fetch book details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favourite", {}, { headers });
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put("http://localhost:1000/api/v1/add-to-cart", {}, { headers });
    alert(response.data.message);
  };

  const deleteBook = async () => {
    const response = await axios.delete("http://localhost:1000/api/v1/delete-book", { headers });
    alert(response.data.message);
    navigate("/all-books");
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <>
      {data && (
        <div className="bg-gradient-to-br from-white to-gray-100 min-h-screen pt-24 px-4 md:px-12 pb-10 text-gray-800">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Image & Buttons */}
            <div className="relative bg-white rounded-2xl p-6 w-full md:w-1/2 shadow-xl flex flex-col items-center">
              <img
                src={data?.url}
                alt="Book Cover"
                className="h-[50vh] md:h-[60vh] lg:h-[70vh] object-contain rounded-xl"
              />

              {isLoggedIn && role === "user" && (
                <>
                  {/* Desktop buttons */}
                  <div className="hidden lg:flex flex-col absolute right-4 top-6 gap-4">
                    <button className="bg-white text-red-600 text-3xl p-3 rounded-full shadow hover:scale-110 transition" onClick={handleFavourite}>
                      <MdFavorite />
                    </button>
                    <button className="bg-blue-500 text-white text-3xl p-3 rounded-full shadow hover:scale-110 transition" onClick={handleCart}>
                      <FaCartShopping />
                    </button>
                  </div>
                  {/* Mobile buttons */}
                  <div className="mt-6 flex justify-center lg:hidden gap-4">
                    <button onClick={handleFavourite} className="bg-white text-red-600 flex items-center gap-2 px-4 py-2 rounded-full shadow hover:scale-105 transition">
                      <MdFavorite className="text-xl" />
                      <span>Favorite</span>
                    </button>
                    <button onClick={handleCart} className="bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-full shadow hover:scale-105 transition">
                      <FaCartShopping className="text-xl" />
                      <span>Cart</span>
                    </button>
                  </div>
                </>
              )}

              {isLoggedIn && role === "admin" && (
                <>
                  {/* Desktop Admin Buttons */}
                  <div className="hidden lg:flex flex-col absolute right-4 top-6 gap-4">
                    <Link to={`/updateBook/${id}`} className="bg-green-400 text-white text-3xl p-3 rounded-full shadow hover:scale-110 transition">
                      <FaRegEdit />
                    </Link>
                    <button className="bg-red-400 text-white text-3xl p-3 rounded-full shadow hover:scale-110 transition" onClick={deleteBook}>
                      <AiFillDelete />
                    </button>
                  </div>
                  {/* Mobile Admin Buttons */}
                  <div className="mt-6 flex justify-center lg:hidden gap-4">
                    <Link to={`/updateBook/${id}`} className="bg-green-400 text-white flex items-center gap-2 px-4 py-2 rounded-full shadow hover:scale-105 transition">
                      <FaRegEdit className="text-xl" />
                      <span>Edit</span>
                    </Link>
                    <button onClick={deleteBook} className="bg-red-400 text-white flex items-center gap-2 px-4 py-2 rounded-full shadow hover:scale-105 transition">
                      <AiFillDelete className="text-xl" />
                      <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Book Info */}
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-4xl font-bold text-blue-700">{data?.title}</h2>
              <p className="text-lg text-gray-600">{data?.description}</p>

              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold text-gray-900">Author:</span> {data?.author}</p>
                <p><span className="font-semibold text-gray-900">Language:</span> {data?.language}</p>
                <p><span className="font-semibold text-gray-900">Description:</span> {data?.desc || 'N/A'}</p>
                <p><span className="font-semibold text-gray-900">Price:</span> ₹{data?.price}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
