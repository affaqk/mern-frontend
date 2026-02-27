import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/users/get-all-users",
        { withCredentials: true }
      );
      setUsers(res.data.users);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          All Users
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5"
            >
              {/* Avatar Circle */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* User Info */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {user.email}
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full ${
                    user.role === "admin"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {user.role}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-5">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm transition">
                  View
                </button>
                <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ViewAllUsers;