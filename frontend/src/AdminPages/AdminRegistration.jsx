import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import {toast} from "react-toastify"
import axios from "axios"
import {useNavigate} from "react-router-dom"
const AdminRegister = () => {
    const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Form Data:', data);
    delete data.confirmPassword;
    const formData=new FormData();
    for(const key in data){
        formData.append(key,data[key])
    }
    try{
        const res=await axios.post('http://localhost:4000/user/admin/register',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        if(res.data.success){
            toast.success(res.data.message);
            return navigate('/admin/login');
        }
        else{
            toast.error(res.data.message);
            return console.log(res);
        }
    }
    catch(Err){
        toast.error(Err?.response?.data?.message || Err.message);
        return console.log(Err);
    }
  };

  const password = watch('password');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-md p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
          Admin Registration
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Create your admin account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 text-gray-700">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="John Doe"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                {...register('name', { required: 'Name is required' })}
              />
            </div>
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="admin@example.com"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email format'
                  }
                })}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-gray-700">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match'
                })}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
