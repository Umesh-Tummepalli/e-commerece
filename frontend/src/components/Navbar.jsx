import React, { useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Search, User, ShoppingCart, AlignJustify, CircleX } from "lucide-react";
import { shopContext } from "../context/ShopContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { cartSize } = useContext(shopContext);
  
  return (
    <nav className="text-black flex justify-between items-center p-6 px-4 sm:px-8 border-b border-gray-100 shadow-sm bg-white  top-0 z-50">
      {/* Logo with subtle hover effect */}
      <span 
        className="text-xl font-bold cursor-pointer hover:scale-105 transition-transform duration-200"
        onClick={() => navigate('/')}
      >
        Logo
      </span>
      
      {/* Desktop Navigation */}
      <ul className="hidden sm:flex space-x-8">
        {[
          { path: "/", name: "Home" },
          { path: "/collection", name: "Collection" },
          { path: "/about", name: "About" },
          { path: "/contact", name: "Contact" }
        ].map((item) => (
          <li key={item.name}>
            <NavLink
              className={({ isActive }) =>
                `px-2 py-1 font-medium transition-all duration-200 ${
                  isActive 
                    ? "text-black border-b-2 border-black" 
                    : "text-gray-600 hover:text-black hover:border-b-2 hover:border-gray-300"
                }`
              }
              to={item.path}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
      
      {/* Icons Group */}
      <div className="flex items-center gap-5 sm:gap-6">
        <Search 
          className="cursor-pointer hover:scale-110 transition-transform duration-200"
          onClick={() => navigate('/collection')}
        />
        
        {/* User Dropdown */}
        <div className="relative group">
          <User className="cursor-pointer hover:scale-110 transition-transform duration-200" />
          <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white/50 backdrop-blur-[7px] backdrop-saturate-100  shadow-2xl  ring-black ring-opacity-5 focus:outline-none opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-50 border-1 border-black/30">
            <div className="py-1">
              <p  
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/profile')}
              >
                My Profile
              </p>
              <p 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate('/orders')}
              >
                Orders
              </p>
              <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                Logout
              </p>
              <Link to="/admin">
                <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  Login as Admin
                </p>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Cart with badge */}
        <Link to="/cart" className="relative">
          <ShoppingCart className="hover:scale-110 transition-transform duration-200" />
          <p className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartSize || 0}
          </p>
        </Link>
        
        {/* Mobile menu button */}
        <div 
          className="sm:hidden ml-2 cursor-pointer"
          onClick={() => setVisible(prev => !prev)}
        >
          <AlignJustify className="hover:scale-110 transition-transform duration-200" />
        </div>
        
        {/* Mobile Navigation */}
        <div className={`sm:hidden fixed inset-0 bg-white z-40 transition-all duration-300 ease-in-out ${visible ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          <div className="p-5 flex justify-end">
            <CircleX 
              className="cursor-pointer hover:rotate-90 transition-transform duration-200"
              size={28}
              onClick={() => setVisible(false)}
            />
          </div>
          
          <ul className="flex flex-col items-center mt-10 space-y-6">
            {[
              { path: "/", name: "Home" },
              { path: "/collection", name: "Collection" },
              { path: "/about", name: "About" },
              { path: "/contact", name: "Contact" }
            ].map((item) => (
              <li key={item.name} className="w-3/4 text-center">
                <NavLink
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                      isActive 
                        ? "bg-black text-white shadow-md" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`
                  }
                  to={item.path}
                  onClick={() => setVisible(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;