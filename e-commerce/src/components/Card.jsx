import React from "react";
import { Link } from "react-router-dom";
const Card = ({ item }) => {
  return (
    <Link to={`/product/${item._id}`}>
      <div className="inline-flex flex-col justify-start m-4 overflow-hidden rounded-2xl">
        <img src={item.image[0]} alt="" className="rounded-lg w-[300px] hover:scale-125 duration-300" />
        <p className="font-bold">{item.name}</p>
        <p className="text-green-500">${item.price}</p>
        <div className="text-end">
        {item.bestseller && <span className="py-1 rounded-full px-7 bg-amber-200 w-fit text-sm">Best Seller</span> }
        </div>
      </div>
    </Link>
  );
};

export default Card;
