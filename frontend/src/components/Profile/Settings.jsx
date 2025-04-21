import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from "../Loader/Loader";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-user-information", { headers });
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      await axios.put("http://localhost:1000/api/v1/update-address", 
        { address: value.address }, 
        { headers }
      );
      alert('Address updated successfully! ✨');
    } catch (error) {
      alert('Oops! Something went wrong. Please try again. ❌');
      console.error("Error updating address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setValue({ address: e.target.value });
  };

  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 pt-16 pb-10 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-blue-700 tracking-tight drop-shadow-md">
            Your Settings 💼
          </h2>
          <p className="mt-2 text-gray-500 text-sm">Keep your details up-to-date ✨</p>
        </div>

        {/* Username */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Username</label>
          <p className="w-full p-4 rounded-xl bg-blue-100 text-blue-800 font-semibold text-lg">
            {profileData.username}
          </p>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <p className="w-full p-4 rounded-xl bg-blue-100 text-blue-800 font-semibold text-lg">
            {profileData.email}
          </p>
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <textarea
            name="address"
            placeholder="Update your address 🏠"
            rows="5"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            value={value.address}
            onChange={handleChange}
          />
        </div>

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Updating... 🌀' : 'Update Address ✏️'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
