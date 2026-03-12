import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const getUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/users/user-profile",{
        withCredentials : true
      })
      console.log(response.data.user.role);
      if(response.data.user.role !== "admin"){
        navigate("/")
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    getUserProfile()
  },[])
  


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-30 top-0 left-0 h-full w-64 
        bg-green-200 shadow-lg transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-6 text-xl font-bold border-b border-green-300">
          Admin Panel
        </div>

        <nav className="mt-4 px-4 space-y-2">
          <Link to="dashboard" className="block p-3 rounded hover:bg-green-300">
            Dashboard
          </Link>
          <Link to="add-product" className="block p-3 rounded hover:bg-green-300">
            Add Product
          </Link>

          <Link
            to="get-all-users"
            className="block p-3 rounded hover:bg-green-300"
          >
            View All Users
          </Link>

          <Link
            to="get-all-products"
            className="block p-3 rounded hover:bg-green-300"
          >
            Products
          </Link>
        </nav>
      </div>

      {/* Right Side Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-md p-4 flex justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
          <h1 className="font-semibold">Admin Dashboard</h1>
        </header>

        {/* Dynamic Page Content */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

// admin-dashboard
// get-all-user
