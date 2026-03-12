import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name : "",
        description : "",
        price : "",
        category : "",
        stocks : ""
    })
    const categoroies = ["furniture", "electronics", "jewelery", "men's clothing", "women's clothing", "bags", "shoes"]

   
    

    const handleChange = (e) => {
        setFormData({...formData, 
            [e.target.name]  : e.target.value
        })
    }
    const submitForm = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3000/api/v1/products/create-product", formData, {
                withCredentials : true
            })
            toast.success("Product added successfully")
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

  return (
    <div className='text-center flex flex-column justify-center mt-18'>
      <div className="fixed flex items-center justify-center text-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Product</h2>

              <form className="space-y-4" onSubmit={submitForm}>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="w-full border p-2 rounded"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  name="stocks"
                  value={formData.stocks}
                  onChange={handleChange}
                  placeholder="Stocks"
                  className="w-full border p-2 rounded"
                />
                <select name="category"  id="" className="w-full border p-2 rounded" value={formData.category}
                  onChange={handleChange}>
                    {
                        categoroies.map((category)=>(
                            <option value={category}>{category}</option>
                        ))
                    }
                </select>

                <div className="flex justify-between gap-2">
                  <button
                    type="button"
                    className="flex-1 bg-gray-400 text-white py-2 rounded"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
    </div>
  )
}

export default AddProduct
