import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserProfile2 = () => {
  const {id} = useParams()
    
  const [user, setUser] = useState();
  const getUserProfile = async () => {
    try {
      const response = await axios.get(
            `http://localhost:3000/api/v1/users/admin-user-profile/${id}`,
            {
                withCredentials : true
            }
      );
      console.log(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: Product Images */}
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4">
            <img
              src={user?.avatar.url}
              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300 rounded-4xl"
            />
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">{user?.name}</h2>

          <p className="text-gray-600">{user?.email}</p>
        
        </div>
      </div>
    </div>
  );
};

export default UserProfile2;
