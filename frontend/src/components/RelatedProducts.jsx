import React,{useContext,useState,useEffect} from 'react'
import { shopContext } from '../context/ShopContext'
import Title from "./Title"
import Card from './Card'
const RelatedProducts = (props) => {
    const {products}=useContext(shopContext);
    const {category}=props;
    const [relatedProds,setrelatedProds]=useState([]);
    useEffect(()=>{
      const relprods=products.filter(item=>item.category===category).slice(0,5);
      console.log(category,relprods);
      setrelatedProds(relprods);
    },[category,products])
  return (
    <div className="p-3 mt-7">
      <div className="text-center">

        <Title text1="Related" text2="Products"/>
      </div>
        <div>
          {
            relatedProds.map((item)=>(
              <Card item={item} key={item._id}/>
            ))
          }
        </div>
    </div>
  )
}

export default RelatedProducts