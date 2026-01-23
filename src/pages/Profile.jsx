import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [user, setUser] = useState();
    const getUserProfile = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/users/user-profile")
            console.log("Sucess");
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        getUserProfile()
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Profile
