import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, ShoppingBag, LogOut } from 'lucide-react'

const Profile = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    uid: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      try {
        console.log('called api')
        setLoading(true)
        const res = await axios.get('http://localhost:4000/user/profile', {
          headers: {
            token: localStorage.getItem('token')
          }
        })
        if (res.data.success) {
          console.log(res.data)
          setUserData({
            name: res.data.user.name || 'User',
            email: res.data.user.email,
            uid: res.data.user._id
          })
        }
      } catch (err) {
        console.error('Error fetching profile:', err)
        if (err.response?.status === 401) {
          navigate('/login')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleLogout = () => {
    // Add your logout functionality here
    console.log('Logout clicked')
    localStorage.removeItem('token')
    navigate('/login')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          <User className="h-12 w-12 text-gray-400" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8 md:p-10">
          {/* Profile Header */}
          <div className="flex flex-col items-center mb-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative mb-6"
            >
              <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-16 w-16 text-blue-600" />
              </div>
              <motion.div 
                className="absolute -bottom-2 -right-2 bg-blue-600 text-white rounded-full p-2 shadow-lg"
                whileHover={{ rotate: 15 }}
              >
                <User className="h-5 w-5" />
              </motion.div>
            </motion.div>

            <motion.h2 
              className="text-3xl font-bold text-gray-800 mb-1"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {userData.name}
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 mb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {userData.email}
            </motion.p>
            <motion.p 
              className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              UID: {userData.uid}
            </motion.p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/orders')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-5 px-6 rounded-xl flex items-center justify-center space-x-3 transition-colors shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ShoppingBag className="h-6 w-6" />
              <span className="text-lg font-medium">View Orders</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-5 px-6 rounded-xl flex items-center justify-center space-x-3 transition-colors shadow-md"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <LogOut className="h-6 w-6" />
              <span className="text-lg font-medium">Logout</span>
            </motion.button>
          </div>

          {/* Stats or Additional Info (optional) */}
          <motion.div 
            className="mt-10 pt-6 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-center text-gray-500 mb-4">Account Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Member Since</p>
                <p className="font-medium">Jan 2023</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="font-medium">12</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Profile