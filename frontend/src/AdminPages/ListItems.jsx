import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Trash2, Loader2 } from "lucide-react";

const ListItems = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  async function fetchItems() {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/product/admin/list", {
        headers: {
          token: localStorage.getItem("adminToken"),
        },
      }); 
      if (res.data.success) {
        setItems(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("adminToken");
        toast.error("Please Login");
        return navigate("/admin/login");
      }
      toast.error(err.response?.data?.message || "Failed to fetch items");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    // Implement your delete logic here
    console.log("Delete item with id:", id);
    try {
      setDeletingId(id);
      const res = await axios.delete(`http://localhost:4000/product/remove/`, {
        data: { id },
        headers: {
          token: localStorage.getItem("adminToken"),
        },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        fetchItems();
        setDeletingId(null);
      } else {
        toast.error(res.data.message);
        setDeletingId(null);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete item");
      console.error(err);
      if (err.response?.status === 401) {
        setDeletingId(null);
        toast.error("Unauthorized");
        return navigate("/admin/login");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 w-3/4 mx-auto">
        <p className="text-xl text-gray-600">No items found</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 md:p-6 w-full max-w-6xl mx-auto">
      {" "}
      {/* Increased max width */}
      <h1 className="text-2xl font-bold text-black mb-6">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Larger Image Grid */}
            <div className="grid grid-cols-2 gap-1 h-64 bg-gray-100">
              {" "}
              {/* Increased height */}
              {item.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative overflow-hidden">
                  <img
                    src={image}
                    alt={`${item.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === 3 && item.images.length > 4 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        +{item.images.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {item.images.length === 0 && (
                <div className="col-span-2 flex items-center justify-center h-full text-gray-400">
                  No images available
                </div>
              )}
            </div>

            {/* Product Details with more space */}
            <div className="p-4 space-y-3">
              {" "}
              {/* Added space between elements */}
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold text-black">
                  {item.name}
                </h2>
                <span className="text-lg font-bold text-blue-600 whitespace-nowrap">
                  ${item.price}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                  {item.category}
                </span>
                {item.subCategory && (
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {item.subCategory}
                  </span>
                )}
              </div>
              <p className="text-gray-700 text-sm">{item.description}</p>
              {item.sizes.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Sizes:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-xs rounded"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* More prominent Delete Button */}
              <div className="flex justify-end pt-3">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id}
                >
                  {deletingId === item._id ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ListItems;
