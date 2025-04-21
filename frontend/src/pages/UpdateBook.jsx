import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const submit = async () => {
    const { url, title, author, price, desc, language } = Data;
    if (!url || !title || !author || !price || !desc || !language) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/update-book",
        Data,
        { headers }
      );
      alert(response.data.message || "Book updated successfully!");
      navigate(`/view-book-details/${id}`);
    } catch (error) {
      console.error("Error updating book:", error);
      alert(error.response?.data?.message || "Failed to update book");
    }
  };

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`,
          { headers }
        );

        const bookData = response.data.book || response.data.data || {};
        setData({
          url: bookData.url || "",
          title: bookData.title || "",
          author: bookData.author || "",
          price: bookData.price || "",
          desc: bookData.desc || "",
          language: bookData.language || "",
        });
      } catch (error) {
        console.error("Error fetching book:", error);
        alert(error.response?.data?.message || "Failed to load book data");
      }
    };

    fetchBookData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto mt-20 bg-white rounded-xl shadow-md p-6 md:p-10 border border-blue-100">
        <h1 className="text-3xl font-bold text-blue-700  mb-6 text-center"> Update Book</h1>

        <div className="space-y-4">
          {["url", "title", "author"].map((field) => (
            <div key={field}>
              <label className="block text-gray-600 capitalize mb-1">
                {field === "url" ? "Image URL" : field}
              </label>
              <input
                type="text"
                name={field}
                value={Data[field]}
                onChange={change}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-blue-300"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">Language</label>
              <input
                type="text"
                name="language"
                value={Data.language}
                onChange={change}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-blue-300"
                placeholder="Language of book"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={Data.price}
                onChange={change}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-blue-300"
                placeholder="Price"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Description</label>
            <textarea
              name="desc"
              value={Data.desc}
              onChange={change}
              rows="4"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-blue-300"
              placeholder="Book description"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={submit}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Update 📤
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel ❌
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
