import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Collection from "../pages/Collection";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import PlaceOrder from "../pages/PlaceOrder";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import AdminPanel from "../AdminPages/AdminPanel";
import DashBoard from "../AdminPages/DashBoard";
import AddItems from "../AdminPages/AddItems";
import ListItems from "../AdminPages/ListItems";
import Queries from "../AdminPages/Queries";
import AdminOrders from "../AdminPages/Orders";
import InvalidRoute from "../components/InvalidRoute";
import AdminLogin from "../AdminPages/AdminLogin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "collection",
        element: <Collection />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "product/:prodId",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "placeOrder",
        element: <PlaceOrder />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPanel />,
    children: [
      {
        path: "",
        element: <DashBoard />,
      },
      {
        path: "addItems",
        element: <AddItems />,
      },
      {
        path: "listItems",
        element: <ListItems />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "queries",
        element: <Queries />,
      },
      {
        path: "login",
        element: <AdminLogin />,
      }
    ],
  },
  {
    path: "*",
    element: <InvalidRoute />,
  },
]);

export default router;
