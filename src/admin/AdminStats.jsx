import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const AdminStats = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);

    const getAllStats = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/users/get-all-users");
            const response2 = await axios.get("")
            setUsers(response.data.users)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=>{
        getAllStats();

    })
  return (
    <div>
      
    </div>
  )
}

export default AdminStats
