import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa6';
import { IoOpenOutline } from 'react-icons/io5';
import Loader from '../components/Loader/Loader';
import SeeUserDetails from './SeeUserData';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState(-1);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    axios.get("http://localhost:1000/api/v1/get-all-order", { headers })
      .then(res => setOrders(res.data.data))
      .catch(() => alert("❌ Failed to load orders"))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = (id, value) => {
    setStatusUpdates({ ...statusUpdates, [id]: value });
  };

  const updateStatus = async (index) => {
    const order = orders[index];
    const newStatus = statusUpdates[order._id] || order.status;

    try {
      const res = await axios.put(
        `http://localhost:1000/api/v1/update-status/${order._id}`,
        { status: newStatus },
        { headers }
      );
      alert(`✅ ${res.data.message}`);
      const updated = [...orders];
      updated[index].status = newStatus;
      setOrders(updated);
      setEditIndex(-1);
    } catch {
      alert("❌ Error updating status");
    }
  };

  const openUserDetails = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  if (loading) {
    return <div className="h-screen flex items-center justify-center"><Loader /></div>;
  }

  if (!orders.length) {
    return <div className="text-center py-10 text-gray-400">🛒 No orders found</div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {showUserModal && (
        <SeeUserDetails userData={selectedUser} onClose={() => setShowUserModal(false)} />
      )}

      <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center md:text-left">📦 All Orders</h1>

      {/* Header */}
      <div className="hidden md:flex font-medium bg-red-400 text-white p-3 rounded mb-2 text-sm">
        <div className="w-[5%] text-center">#</div>
        <div className="w-[25%]">👤 User</div>
        <div className="w-[25%]">📚 Book</div>
        <div className="w-[20%]">💵 Price</div>
        <div className="w-[15%]">📌 Status</div>
        <div className="w-[10%] text-right">🔍</div>
      </div>

      {/* Orders */}
      {orders.map((order, i) => (
        <div key={order._id} className="flex flex-col md:flex-row items-start md:items-center bg-blue-500 text-white p-4 rounded mb-3 text-sm md:text-base gap-2">
          <div className="w-full md:w-[5%] font-bold md:text-center">#{i + 1}</div>

          <div className="w-full md:w-[25%] truncate">
            <span className="block md:hidden text-xs text-gray-200">User:</span>
            <button onClick={() => openUserDetails(order.user)} className="hover:text-blue-200 truncate">
              {order.user?.name || order.user?.email || "N/A"}
            </button>
          </div>

          <div className="w-full md:w-[25%] truncate">
            <span className="block md:hidden text-xs text-gray-200">Book:</span>
            {order.book?.title || "N/A"}
          </div>

          <div className="w-full md:w-[20%] hidden md:block">
            ₹{order.book?.price?.toFixed(2) || "0.00"}
          </div>

          <div className="w-full md:w-[15%]">
            <span className="block md:hidden text-xs text-gray-200">Status:</span>
            <button onClick={() => setEditIndex(i)}>
              <span className={
                order.status === "Order placed" ? "text-yellow-300" :
                order.status === "Canceled" ? "text-red-300" :
                "text-green-300"
              }>
                {order.status}
              </span>
            </button>
            {editIndex === i && (
              <div className="mt-1 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <select
                  className="bg-white text-black p-1 rounded"
                  value={statusUpdates[order._id] || order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  {["Order placed", "Out for delivery", "Delivered", "Canceled"].map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
                <button onClick={() => updateStatus(i)} className="text-green-300 hover:text-pink-300">
                  <FaCheck />
                </button>
              </div>
            )}
          </div>

          <div className="w-full md:w-[10%] text-right">
            <button onClick={() => openUserDetails(order.user)} className="hover:text-blue-200">
              <IoOpenOutline size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
