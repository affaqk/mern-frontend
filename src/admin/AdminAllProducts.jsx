import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAllProducts() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });

  const openUpdateModal = (product) => {
    setSelectedProductId(product._id);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/products/update-product/${selectedProductId}`,
        formData,
        { withCredentials: true },
      );

      // Update UI instantly without refetch
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === selectedProductId
            ? { ...product, ...formData }
            : product,
        ),
      );

      setIsModalOpen(false);
    } catch (error) {
      console.log("Update failed");
    }
  };

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

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/products/delete-product/${id}`,
        { withCredentials: true },
      );

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id),
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
                  <button
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-sm transition"
                    onClick={() => openUpdateModal(product)}
                  >
                    Update
                  </button>

                  <button
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm transition"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Update Product</h2>

              <form onSubmit={handleUpdateSubmit} className="space-y-4">
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
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="w-full border p-2 rounded"
                />

                <div className="flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-400 text-white py-2 rounded"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
