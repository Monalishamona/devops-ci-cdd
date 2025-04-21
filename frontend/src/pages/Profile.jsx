import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Profile/Sidebar';
import axios from "axios";
import Loader from '../components/Loader/Loader';
import MobileNav from '../components/Profile/MobileNav';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-user-information", { headers });
        setProfile(response.data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700 pt-20 px-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen pt-20 px-2 sm:px-4 md:px-8 lg:px-12">
      {/* Mobile Nav */}
      <div className="block md:hidden mb-4">
        <MobileNav />
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 lg:w-1/5">
          <div className="bg-white rounded-xl shadow-md p-4">
            <Sidebar data={profile} />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
