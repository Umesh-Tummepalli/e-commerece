import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./Routing/routes";
import ShopProvider from "./context/ShopContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <ShopProvider>
      <RouterProvider router={router}></RouterProvider>
    </ShopProvider>
  </StrictMode>
);
