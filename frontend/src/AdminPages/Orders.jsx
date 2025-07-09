import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Loader2, ShoppingBag,Check } from "lucide-react";
import OrderCard from "../components/OrderCard";
import { shopContext } from "../context/ShopContext";
const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { products } = useContext(shopContext);

  useEffect(() => {
    try {
      async function fetchOrders() {
        setLoading(true);
        const res = await axios.get("http://localhost:4000/orders/admin", {
          headers: {
            token: localStorage.getItem("adminToken"),
          },
        });
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          toast.error(res.data.message);
        }
      }
      if (localStorage.getItem("adminToken")) {
        fetchOrders();
      } else {
        toast.error("Please login as admin");
        window.location.href = "/admin/login";
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error("Admin session expired. Please login again");
        return (window.location.href = "/admin/login");
      }
      toast.error("Failed to fetch orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-gray-700" />
          <p className="mt-4 text-lg text-gray-700">Loading all orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-white p-6"
      >
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Orders Found
        </h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          There are no orders in the system yet.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Orders</h1>
          <p className="text-gray-600">{orders.length} orders total</p>
        </div>

        <div className="space-y-6 ">
          {orders.map((orderItem) => {
            return (
              <div
                 key={orderItem._id}
              >
              <OrderCard
                order={orderItem}
                product={products.find((item) => item._id === orderItem.prodId)}
                showCustomerInfo={true} // New prop to show customer info for admin
                />
                <div className="flex justify-center hidden">
                <button className="p-2 rounded-sm bg-green-400 m-3 flex gap-2 relative hover:opacity-80">
                  Mark Delivered <Check />
                  <p className="p-2 bg-green-400 rotate-45 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">

                  </p>
                </button>
                </div>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
