import React, { useEffect, useState, useContext } from 'react'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import { shopContext } from '../context/ShopContext'
import { motion } from 'framer-motion'
import { Loader2, ShoppingBag } from 'lucide-react'
import OrderCard from '../components/OrderCard'

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { products } = useContext(shopContext);

  useEffect(() => {
    try {
      async function fetchOrders() {
        setLoading(true)
        const res = await axios.get('http://localhost:4000/orders/user', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          toast.error(res.data.message);
        }
      }
      if (localStorage.getItem('token')) {
        fetchOrders();
      } else {
        toast.error('Please login to view your orders');
        navigate('/login');
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error('Session expired. Please login again');
        return navigate('/login');
      }
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-gray-700" />
          <p className="mt-4 text-lg text-gray-700">Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center bg-white p-6"
      >
        <ShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Yet</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          You haven't placed any orders yet. Start shopping to see your orders here.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </Link>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
        
        <div className="space-y-6">
          {orders.map((orderItem) => (
            <OrderCard 
              key={orderItem._id}
              order={orderItem}
              product={products.find(item => item._id === orderItem.prodId)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders