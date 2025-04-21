import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-full border border-gray-100">
      {/* User Info */}
      <div className="flex flex-col items-center text-center">
        <img
          src={data.avatar}
          className="h-24 w-24 rounded-full object-cover border-4 border-blue-100 shadow-sm"
          alt="User avatar"
        />
        <p className="mt-4 text-xl font-semibold text-gray-800">{data.username}</p>
        <p className="text-sm text-gray-500 mt-1">{data.email}</p>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-5"></div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1">
        {role === "user" && (
          <>
            <SidebarLink 
              to="/profile" 
              label="Favourites" 
              icon="❤️" 
              activeClassName="bg-blue-50 text-blue-600 border-blue-200"
            />
            <SidebarLink 
              to="/profile/orderHistory" 
              label="Order History" 
              icon="📦" 
              activeClassName="bg-blue-50 text-blue-600 border-blue-200"
            />
            <SidebarLink 
              to="/profile/settings" 
              label="Settings" 
              icon="⚙️" 
              activeClassName="bg-blue-50 text-blue-600 border-blue-200"
            />
          </>
        )}

        {role === "admin" && (
          <>
            <SidebarLink 
              to="/profile" 
              label="All Orders" 
              icon="📋" 
              activeClassName="bg-blue-50 text-blue-600 border-blue-200"
            />
            <SidebarLink 
              to="/profile/add-book" 
              label="Add Book" 
              icon="➕" 
              activeClassName="bg-blue-50 text-blue-600 border-blue-200"
            />
          </>
        )}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-red-100 bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors duration-200"
      >
        <IoMdLogOut size={18} />
        Logout
      </button>
    </div>
  );
};

// Enhanced sidebar link component using NavLink for active styling
const SidebarLink = ({ to, label, icon, activeClassName }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 rounded-lg border border-transparent text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 ${
        isActive ? activeClassName : ''
      }`
    }
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default Sidebar;
