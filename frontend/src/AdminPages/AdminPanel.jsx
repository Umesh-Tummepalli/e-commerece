import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {useNavigate,Link} from 'react-router-dom'
import { 
  LayoutDashboard, 
  PackagePlus, 
  List, 
  ShoppingCart, 
  MessageSquare,
  Menu,
  X
} from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

const AdminPanel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate=useNavigate();
  function handleLogout(){
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navLinks = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { name: "Add Items", icon: PackagePlus, path: "/admin/additems" },
    { name: "List Items", icon: List, path: "/admin/listitems" },
    { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
    { name: "Customer Queries", icon: MessageSquare, path: "/admin/queries" },
  ];

  // Active link style
  const activeLinkClass = "bg-gray-200 font-medium text-black";
  const normalLinkClass = "hover:bg-gray-200";

  return (
    <div className="flex h-screen bg-white text-black overflow-hidden font-[Poppins]">
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-black text-white"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <motion.div
            initial={{ x: isMobile ? -300 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`w-64 bg-gray-100 border-r border-gray-200 flex-shrink-0 h-full fixed md:relative z-40`}
          >
            <div className="p-4 h-full flex flex-col">
              <h1 className="text-2xl font-bold mb-8 px-2">
                <Link to="/">
                <img src="/public/logo.svg" alt="" className="mb-4"/>
                </Link>
                Admin Panel</h1>
              <nav className="flex-1">
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <NavLink
                        to={link.path}
                        end
                        className={({ isActive }) => 
                          `flex items-center p-3 rounded-lg transition-colors ${
                            isActive ? activeLinkClass : normalLinkClass
                          }`
                        }
                      >
                        <link.icon className="w-5 h-5 mr-3" />
                        <span>{link.name}</span>
                      </NavLink>
                    </li>
                  ))}
                  <li>
                      <button
                        className={
                          `flex items-center p-3 rounded-lg transition-colors`
                        }
                      >
                        <span
                        onClick={handleLogout}
                        >Logout</span>
                      </button>
                    </li>
                </ul>
              </nav>
              <div className="mt-auto p-4 text-sm text-gray-500">
                <p>Admin Portal v1.0</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`flex-1 overflow-auto transition-all duration-300`}
      >
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
};

export default AdminPanel;