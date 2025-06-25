import React,{useContext,useState,useEffect} from "react";
import Title from "./Title";
import { shopContext } from "../context/ShopContext";
import Card from "./Card";
const LatestCollection = () => {
  const {products} = useContext(shopContext);
  const [latestProds,setLatestProds]=useState([]);
  useEffect(()=>{
    setLatestProds(products.slice(0,10));
  },[products])
  // console.log(products)
  return (
    <div className="">
      <div className="text-center">
        <Title text1="Latest" text2="Collection" />
      </div>
      <div className="flex flex-wrap justify-center ">
        {
          latestProds.slice(0,10).map((item)=>(
            <Card key={item._id} item={item}/>
          ))
        }
      </div>
    </div>
  );
};

export default LatestCollection;
