import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [Data, setData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    desc: '',
    language: '',
  });

  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    const { url, title, author, price, desc, language } = Data;

    if (!url || !title || !author || !price || !desc || !language) {
      alert('⚠️ All fields are required!');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:1000/api/v1/add-book',
        Data,
        { headers }
      );

      alert(response.data.message || '✅ Book added successfully!');
      setData({ url: '', title: '', author: '', price: '', desc: '', language: '' });
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || '❌ Failed to add book');
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] px-4 py-10 max-w-3xl mx-auto">
<h1 className="text-4xl text-center font-extrabold text-blue-600 drop-shadow-sm mb-2">
             All Books
          </h1>
      <div className="bg-white p-6 rounded-xl shadow-md border-2  mt-5 space-y-5">
        {[
          { label: ' Image URL', name: 'url', type: 'text', placeholder: 'Enter image URL' },
          { label: ' Title', name: 'title', type: 'text', placeholder: 'Enter book title' },
          { label: ' Author', name: 'author', type: 'text', placeholder: 'Enter author name' },
          { label: ' Language', name: 'language', type: 'text', placeholder: 'e.g. English' },
          { label: ' Price', name: 'price', type: 'number', placeholder: 'e.g. 199' },
        ].map((input, idx) => (
          <div key={idx}>
            <label className="block mb-1 text-gray-600 font-medium">{input.label}</label>
            <input
              type={input.type}
              name={input.name}
              value={Data[input.name]}
              onChange={change}
              placeholder={input.placeholder}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-blue-400"
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 text-gray-600 font-medium">📝 Description</label>
          <textarea
            name="desc"
            rows="4"
            placeholder="Write a short description..."
            value={Data.desc}
            onChange={change}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-blue-400"
          />
        </div>

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
