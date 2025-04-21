import React from 'react';
import { FaTimes } from 'react-icons/fa';

const SeeUserDetails = ({ userData, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          👤 User Information
        </h2>

        {/* User Details */}
        <div className="space-y-5 text-gray-700 text-sm sm:text-base">
          <div>
            <p className="text-gray-500">Username:</p>
            <p className="font-medium">{userData?.username || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500">Email:</p>
            <p className="font-medium">{userData?.email || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500">Address:</p>
            <p className="font-medium">{userData?.address || "N/A"}</p>
          </div>

          <div>
            <p className="text-gray-500">Phone:</p>
            <p className="font-medium">{userData?.phone || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeUserDetails;
