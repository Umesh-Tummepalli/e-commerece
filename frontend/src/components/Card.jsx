import React from "react";
import { Link } from "react-router-dom";
const Card = ({ item }) => {
  return (
    <Link to={`/product/${item._id}`}>
      <div className="inline-flex flex-col justify-start m-4 overflow-hidden rounded-2xl border-1 border-black/50 shadow-2xl max-w-[320px]">
        <img src={item.image[0]} alt="" className="rounded-lg w-full hover:scale-125 duration-300 " />
        <p className="font-bold p-2">{item.name}</p>
        <p className="text-green-500 px-2 text-2xl font-bold">${item.price} <del className="text-gray-500 text-lg font-light">${item.price+200}</del></p>
        <div className="text-center p-2">
        {item.bestseller && <span className="py-3 rounded-full px-7 bg-amber-200  text-sm block">Best Seller</span> }
        </div>
      </div>
    </Link>
  );
};

export default Card;
