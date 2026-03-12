import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProductsDetail from "./pages/ProductsDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UpdateProfile from "./pages/UpdateProfile";
import UpdatePassword from "./pages/UpdatePassword";
import AdminDashboard from "./admin/AdminDashboard";
import ViewAllUsers from "./admin/ViewAllUsers";
import AdminAllProducts from "./admin/AdminAllProducts";
import UserProfile2 from "./admin/UserProfile2";
import AddProduct from "./admin/AddProduct";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-detail/:id" element={<ProductsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        {/* admin routes  */}
        <Route path="/admin-dashboard" element={<AdminDashboard />}>
          <Route path="get-all-users" element={<ViewAllUsers />} />
          <Route path="get-all-products" element={<AdminAllProducts />} />
          <Route path="user-profile/:id" element={<UserProfile2 />} />
          <Route path = "add-product" element = {<AddProduct/>}/>

        </Route>
      </Routes>
    </>
  );
};

export default App;
