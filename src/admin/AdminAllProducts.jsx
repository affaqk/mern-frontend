import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAllProducts() {
  const [products, setProducts] = useState([]);

  const allProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/products/get-all-products",
        { withCredentials: true },
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allProducts();
  }, []);
    const updateProduct = async (id) => {
      try {
        await axios.put(
          `http://localhost:3000/api/v1/products/update-product/${id}`,
          { withCredentials: true },
        );
      } catch (error) {
        console.log("Something went wrong");
      }
    };
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/products/delete-product/${id}`,
        { withCredentials: true },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <img
                src={product?.images?.[0]?.url}
                alt={product.title}
                className="w-full h-48 object-cover"
              />

              {/* Card Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                  {product.description}
                </p>

                <p className="text-blue-600 font-bold mb-1">${product.price}</p>

                <p className="text-xs text-gray-400 mb-3">{product.category}</p>

                <div className="flex justify-between gap-2">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-sm transition" onClick={()=>updateProduct(product_id)}>
                    Update
                  </button>

                  <button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm transition"
                    onClick={()=>deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
