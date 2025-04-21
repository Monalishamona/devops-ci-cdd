import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!values.username || !values.email || !values.password || !values.address) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post("http://localhost:1000/api/v1/sign-up", values);
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred during registration");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 pt-24 pb-16 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-blue-700 tracking-tight drop-shadow-md">
            Create Your Account
          </h2>
          <p className="mt-2 text-gray-500 text-sm">Start your journey with us 🚀</p>
        </div>

        {/* Username */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
            value={values.username}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
            value={values.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
            value={values.password}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <textarea
            name="address"
            placeholder="Your full address"
            rows="3"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
            value={values.address}
            onChange={handleChange}
          />
        </div>

        {/* Register Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-700 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition duration-200"
        >
          Register Now
        </button>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
