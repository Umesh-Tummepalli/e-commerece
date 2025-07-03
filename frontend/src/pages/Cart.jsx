import React, { useState, useContext, useEffect } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, products } = useContext(shopContext);
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
async function checkAuth() {
    try {
      const res = await axios.get("http://localhost:4000/user/profile", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (!res.data.success) {
        toast.error(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error("Please Login to Continue");
      navigate("/login");
    }
  }
  useEffect(() => {
    checkAuth();
    const currObj = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        currObj.push({
          _id: items,
          size: item,
          quantity: cartItems[items][item],
          itemData: products.find((prod) => prod._id === items),
        });
      }
    }
    setCartProducts(currObj);
  }, [cartItems, products]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col justify-center items-center w-full md:w-3/4">
        {cartProducts.map((item, index) => {
          const { itemData } = item;
          return (
            <div
              key={index}
              className="rounded-2xl border m-3 flex flex-col items-center md:flex-row w-full md:w-3/4 overflow-hidden"
            >
              <img
                src={itemData.image}
                alt=""
                className="w-full md:w-1/3 object-cover"
              />
              <div className="text-start w-full m-3 flex flex-col justify-between space-y-2.5 p-3">
                <p className="text-lg md:text-xl">{itemData.name}</p>
                <div className="flex items-center justify-between">
                  <p className="text-start p-2 md:p-3 rounded-md bg-black text-white w-fit px-4 md:px-6">
                    {item.size}
                  </p>
                  <p className="text-end text-2xl md:text-3xl text-green-500">
                    ${itemData.price * item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2 md:gap-3 justify-center flex-col md:flex-row">
                  <div className="border border-black/50 rounded-md flex text-2xl md:text-3xl text-black/60 justify-between my-2 md:my-4 w-full md:w-1/3">
                    <button className="border-r border-black/50 p-2 w-1/3 cursor-pointer hover:bg-black duration-300 hover:text-white">
                      -
                    </button>
                    <span className="inline-block p-2">{item.quantity}</span>
                    <button className="border-l border-black/50 p-2 w-1/3 cursor-pointer hover:bg-black duration-300 hover:text-white">
                      +
                    </button>
                  </div>
                  <button className="text-white bg-black hover:opacity-80 p-2 md:p-3 rounded-md h-fit w-full md:w-1/3">
                    Remove From Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sticky top-20 border h-fit p-3 rounded-md w-full md:w-1/3 m-3 text-center">
        <Title text1="Total" text2="Price" />
        <div className="border-b">
          {cartProducts.map((item, index) => {
            const { itemData } = item;
            return (
              <div key={index} className="flex justify-between my-2 p-2">
                <p className="max-w-2/3 text-wrap text-sm md:text-base">
                  {itemData.name} -{" "}
                  <span className="border px-1 md:px-2 inline-block">
                    {item.size}
                  </span>
                </p>
                <p className="text-sm md:text-base">
                  {itemData.price} x {item.quantity} ={" "}
                  <span className="text-green-400">
                    {item.quantity * itemData.price}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
        <div className="border-b pb-3">
          <div className="flex justify-between">
            <p className="font-medium">Total</p>
            <p className="font-bold">
              ${" "}
              {cartProducts.reduce((acc, curr) => {
                return acc + curr.quantity * curr.itemData.price;
              }, 0)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium">Shipping Fee</p>
            <p className="font-bold">$10</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="font-medium">Total Fare</p>
          <p className="font-bold">
            ${" "}
            {cartProducts.reduce((acc, curr) => {
              return acc + curr.quantity * curr.itemData.price;
            }, 0) + 10}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
