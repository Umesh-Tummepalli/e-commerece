import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { motion } from "framer-motion";

const DashBoard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    async function checkAuth() {
      try {
        await axios.get("http://localhost:4000/user/admin/checkAuth", {
          headers: {
            token: localStorage.getItem('adminToken')
          }
        });
      } catch (err) {
        console.log(err);
        if (err.response?.status === 401) {
          localStorage.removeItem('adminToken');
          toast.error('Session expired. Please login again.');
          navigate('/admin/login');
        }
      }
    }
    checkAuth();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-50 min-h-screen flex flex-col justify-center items-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
            >
              Admin Command Center
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-gray-600 mb-6"
            >
              Welcome back to your operational hub. Efficiently manage your entire store with powerful tools to:
            </motion.p>
            
            <motion.ul 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-3 mb-8"
            >
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Manage products and inventory in real-time</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Analyze sales trends and customer data</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Respond to customer inquiries efficiently</span>
              </li>
            </motion.ul>
          </div>
          
          <div className="md:w-1/2 bg-blue-50 flex items-center justify-center p-8">
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg width="300" height="300" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Dashboard background */}
                <rect x="20" y="20" width="160" height="160" rx="10" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2"/>
                
                {/* Graph lines */}
                <motion.path
                  d="M40 140 L60 100 L80 120 L100 80 L120 100 L140 60 L160 100"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                  fill="none"
                />
                
                {/* Graph points */}
                <motion.circle 
                  cx="40" cy="140" r="4" fill="#3B82F6"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.circle 
                  cx="60" cy="100" r="4" fill="#3B82F6"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                />
                <motion.circle 
                  cx="80" cy="120" r="4" fill="#3B82F6"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                />
                <motion.circle 
                  cx="100" cy="80" r="4" fill="#3B82F6"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.1 }}
                />
                <motion.circle 
                  cx="120" cy="100" r="4" fill="#3B82F6"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.3 }}
                />
                <motion.circle 
                  cx="140" cy="60" r="4" fill="#3B82F6"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />
                <motion.circle 
                  cx="160" cy="100" r="4" fill="#3B82F6"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.7 }}
                />
                
                {/* Icons */}
                <motion.rect
                  x="50" y="40" width="30" height="30" rx="5" fill="#DBEAFE"
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                />
                <motion.circle
                  cx="120" cy="40" r="15" fill="#DBEAFE"
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <motion.path
                  d="M50 180 L70 160 L90 180 L110 160 L130 180 L150 160"
                  stroke="#93C5FD"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                  fill="none"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-8 text-center text-gray-500 text-sm"
      >
        <p>Last login: {new Date().toLocaleString()}</p>
      </motion.div>
    </div>
  );
};

export default DashBoard;