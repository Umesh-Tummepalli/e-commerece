import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
const Layout = () => {
  return (
    <div className="font-[Poppins]">
      <ScrollToTop>
        <Navbar />
        <Outlet />
      </ScrollToTop>
    </div>
  );
};

export default Layout;
