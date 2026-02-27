import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import cookies from "js-cookie"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    const token = cookies.get("token")
    if(!token){
      navigate("/login")
    }
  })

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className={`fixed md:static z-30 top-0 left-0 h-full w-64 
        bg-green-200 shadow-lg transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300`}>

        <div className="p-6 text-xl font-bold border-b border-green-300">
          Admin Panel
        </div>

        <nav className="mt-4 px-4 space-y-2">
          <Link to="/admin/dashboard" className="block p-3 rounded hover:bg-green-300">
            Dashboard
          </Link>

          <Link to="admin/get-all-users" className="block p-3 rounded hover:bg-green-300">
            View All Users
          </Link>

          <Link to="admin/get-all-products" className="block p-3 rounded hover:bg-green-300">
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