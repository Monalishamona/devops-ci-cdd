import React, { useState, useEffect } from 'react';
import Loader from "../components/Loader/Loader";
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
      const cartData = res.data.data || [];
      setCart(cartData);
      setTotal(cartData.reduce((sum, item) => sum + (item.price || 0), 0));
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCart([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const deleteItem = async (bookId) => {
    try {
      await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookId}`, {}, { headers });
      const removedItem = cart.find(item => item._id === bookId);
      setCart(prev => prev.filter(item => item._id !== bookId));
      setTotal(prev => prev - (removedItem?.price || 0));
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        { order: cart },
        { headers }
      );

      if (response.data.status === "Success") {
        alert(response.data.message);
        await fetchCart(); 
        navigate("/profile/orderHistory");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to place order");
    }
  };

  if (cart === null) return <Loader />;

  return (
    <div className="pt-[80px] min-h-screen flex flex-col justify-between bg-gray-50">
      <div className="flex-grow px-4 md:px-10 pb-32">
        {cart.length === 0 ? (
          <div className="w-full h-[70vh] relative bg-white flex items-center justify-center rounded-lg shadow-inner">
            <div className="text-center z-10">
              <img src="/cart.png" alt="Empty Cart" className="h-auto w-48 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-slate-800">🛒 Your cart is empty!</h2>
              <p className="text-slate-500 mt-2">Looks like you haven’t added anything yet.</p>
              <Link
                to="/all-books"
                className="mt-6 inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg transition"
              >
                Browse Books 📚
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-slate-700 mb-6 text-center">📚 Your Cart</h1>

            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item._id} className="bg-white rounded-xl shadow-md p-4 md:flex md:items-center md:justify-between gap-4">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-[120px] h-[150px] object-cover rounded-lg shadow"
                    />
                    <div className="text-left max-w-md">
                      <h2 className="text-2xl font-semibold text-slate-800">{item.title}</h2>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-3">{item.desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between mt-4 md:mt-0">
                    <p className="text-lg font-bold text-green-600 mb-2">₹{item.price}</p>
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="flex items-center gap-1 bg-red-100 text-red-700 border border-red-600 px-4 py-2 rounded hover:bg-red-200 transition"
                    >
                      <AiFillDelete size={18} />
                      <span className="text-sm font-medium">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Summary Section */}
      {cart.length > 0 && (
        <div className="bg-white w-full shadow-inner px-6 md:px-20 py-6 border-t border-slate-200 fixed bottom-0 left-0 z-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-700 text-lg font-semibold">
              <p>🧾 Total Books: <span className="font-bold">{cart.length}</span></p>
              <p>💸 Total Price: <span className="text-green-600 font-bold">₹{total}</span></p>
            </div>
            <button
              className="mt-3 md:mt-0 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-lg transition-all shadow"
              onClick={PlaceOrder}
            >
              ✅ Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
