import React, { useState,useContext } from "react";
import { NavLink, Link,useNavigate } from "react-router-dom";
import { Search, User, ShoppingCart, AlignJustify,CircleX } from "lucide-react";
import { shopContext } from "../context/ShopContext";
const Navbar = () => {
  const navigate=useNavigate();
  const [visible, setvisible] = useState(false);
  const {cartSize}=useContext(shopContext);
  return (
    <nav className="text-black  flex justify-between sm:justify-around items-center p-8">
      <span>Logo</span>
      <ul className="space-x-10  hidden sm:block">
        <NavLink
          className={({ isActive }) =>
            `hover:border-b-2 border-black ${isActive && "border-b-2"}`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `hover:border-b-2 border-black ${isActive && "border-b-2"}`
          }
          to="/collection"
        >
          Collection
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `hover:border-b-2 border-black ${isActive && "border-b-2"}`
          }
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `hover:border-b-2 border-black ${isActive && "border-b-2"}`
          }
          to="/contact"
        >
          Contact
        </NavLink>
      </ul>
      <div className="flex justify-between gap-5">
          <Search 
          onClick={()=>{navigate('/collection')}}
          />
        <div className="relative group ">
          <User />
          <div className="absolute whitespace-nowrap group-hover:opacity-100 opacity-0 max-h-0 overflow-hidden duration-200 border-2 rounded-xl py-2 group-hover:max-h-[1000px] h-fit bg-white/5 border-black/10 backdrop-blur-sm backdrop-saturate-150 shadow-2xl z-10">
            <p className="cursor-pointer px-5 py-2 hover:bg-black hover:text-white duration-300 "
            onClick={()=>{navigate('/profile')}}
            >
              My Profile
            </p>
            <p className="cursor-pointer px-5 py-2 hover:bg-black hover:text-white duration-300 "
            onClick={()=>{navigate('/orders')}}
            >
              Orders
            </p>
            <p className="cursor-pointer px-5 py-2 hover:bg-black hover:text-white duration-300 ">
              Logout
            </p>
            <Link to="/admin">
            <p className="cursor-pointer px-5 py-2 hover:bg-black hover:text-white duration-300 ">
              Login as Admin
            </p>
            </Link>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <ShoppingCart />
          <p className="bg-black text-white absolute p-1 px-1.5 rounded-full text-sm top-0 translate-x-full -translate-y-1/2 aspect-square">
            {cartSize||0}
          </p>
        </Link>
        <div
          className="sm:hidden mx-3"
          onClick={() => setvisible(prev => !prev)}
        >
          <AlignJustify />
        </div>
        {/* small screen navbar */}
        <nav className={`sm:hidden fixed top-0 right-0 w-screen bg-white h-screen duration-300 overflow-hidden ${visible?"max-w-[1000px]":'max-w-0'} ` }>
          <p
            onClick={()=>{setvisible(prev=>!prev)}}
            className="p-5 w-full"
          >
          <CircleX 
          />
          </p>
          <ul className="flex flex-col  items-center">
        <NavLink
          className={({ isActive }) =>
            `hover:border-b-2 border-black duration-300 ${isActive ? "border-b-4 w-1/2":"w-3/4"} bg-black/30 m-4 rounded-2xl p-4 text-center `
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `hover:border-b-2 border-black duration-300 ${isActive ? "border-b-4 w-1/2":"w-3/4"} bg-black/30 m-4 rounded-2xl p-4 text-center `
          }
          to="/collection"
        >
          Collection
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `hover:border-b-2 border-black duration-300 ${isActive ? "border-b-4 w-1/2":"w-3/4"} bg-black/30 m-4 rounded-2xl p-4 text-center `
          }
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `hover:border-b-2 border-black duration-300 ${isActive ? "border-b-4 w-1/2":"w-3/4"} bg-black/30 m-4 rounded-2xl p-4 text-center `
          }
          to="/contact"
        >
          Contact
        </NavLink>
      </ul>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
