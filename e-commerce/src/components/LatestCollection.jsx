import React,{useContext} from "react";
import Title from "./Title";
import { shopContext } from "../context/ShopContext";
import Card from "./Card";
const LatestCollection = () => {
  const {products} = useContext(shopContext);

  console.log(products)
  return (
    <div className="">
      <div className="text-center">
        <Title text1="Latest" text2="Collection" />
      </div>
      <div className="flex flex-wrap justify-center ">
        {
          products.slice(0,10).map((item)=>(
            <Card key={item._id} item={item}/>
          ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
