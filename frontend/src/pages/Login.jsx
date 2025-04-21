import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (!Values.username || !Values.password) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post("http://localhost:1000/api/v1/sign-in", Values);
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      navigate("/profile");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 pt-24 pb-16 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-blue-700 tracking-tight drop-shadow-md">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-500 text-sm">Login to continue ✨</p>
        </div>

        {/* Username */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">Username</label>
          <input
            name="username"
            placeholder="Enter your username"
            type="text"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
            value={Values.username}
            onChange={change}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            name="password"
            placeholder="Enter your password"
            type="password"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800"
            value={Values.password}
            onChange={change}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={submit}
          className="w-full bg-blue-700 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition duration-200"
        >
          Login
        </button>

        {/* Signup Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            New here?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
