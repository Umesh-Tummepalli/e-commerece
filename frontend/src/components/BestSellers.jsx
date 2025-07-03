import React,{useState,useContext,useEffect} from 'react'
import {shopContext} from "../context/ShopContext"
import Card from './Card';
import Title from './Title'
const BestSellers = () => {
    const [bestseller,setbestseller]=useState([]);
    const {products}=useContext(shopContext);
    useEffect(()=>{
        setbestseller(products.filter(item=>item.bestSeller))
    },[products])
    // useEffect(()=>{
    //     console.log(bestseller);
    // },[bestseller]);
  return (
    <div className="">
        <div className="text-center">
        <Title text1="Best" text2="Seller"/>
        </div>
        <div className="flex flex-wrap justify-center">
      {
          bestseller.map((item)=>(
              <Card id={item._id} item={item} key={item._id}/>
            ))
        }
        </div>
    </div>
  )
}

export default BestSellers
