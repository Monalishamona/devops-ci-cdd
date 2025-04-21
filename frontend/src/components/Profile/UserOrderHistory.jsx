import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const headers = {
    id: localStorage.getItem('id'),
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const fetchOrderHistory = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:1000/api/v1/get-order-history', { headers });
      setOrderHistory(response.data.data || []);
    } catch (error) {
      console.error('Error fetching order history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 tracking-tight">
            Your Order History 🛒
          </h1>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader />
          </div>
        ) : orderHistory.length === 0 ? (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-xl sm:text-2xl font-semibold text-blue-600 mb-4">No Orders Yet</h1>
            <img
              className="h-40 sm:h-[20vh] mb-4 rounded-xl shadow-md"
              src="https://img.freepik.com/free-vector/order-now-banner_23-2148711629.jpg"
              alt="No orders"
            />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-lg bg-white p-4">
            <table className="min-w-full table-auto text-sm sm:text-base">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="py-3 px-4 sm:px-6 text-left">Sr.</th>
                  <th className="py-3 px-4 sm:px-6 text-left">Book</th>
                  <th className="py-3 px-4 sm:px-6 text-left">Description</th>
                  <th className="py-3 px-4 sm:px-6 text-left">Price</th>
                  <th className="py-3 px-4 sm:px-6 text-left">Status</th>
                  <th className="py-3 px-4 sm:px-6 text-left">Mode</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((item, index) => (
                  <tr key={item._id} className="hover:bg-blue-50 transition-all">
                    <td className="py-3 px-4 sm:px-6">{index + 1}</td>
                    <td className="py-3 px-4 sm:px-6">
                      <Link to={`/book/${item.book?._id}`} className="text-blue-500 hover:underline">
                        {item.book?.title || 'Untitled'}
                      </Link>
                    </td>
                    <td className="py-3 px-4 sm:px-6">
                      {item.book?.desc?.slice(0, 60)}...
                    </td>
                    <td className="py-3 px-4 sm:px-6 text-green-500 font-semibold">
                      ₹{item.book?.price || 0}
                    </td>
                    <td className="py-3 px-4 sm:px-6 capitalize text-yellow-500">
                      {item.status || 'Pending'}
                    </td>
                    <td className="py-3 px-4 sm:px-6">COD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrderHistory;
