import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { shopContext } from "../context/ShopContext";
import ImagePreview from "../components/ImagePreview";
import { Star } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import axios from "axios";

const Product = () => {
  const { prodId } = useParams();
  const { products } = useContext(shopContext);
  const [prodInfo, setProdInfo] = useState(null);
  const [size, setSize] = useState("S");
  const navigate = useNavigate();
  async function addToCart(itemId, size) {
    try{
      console.log('api call done')
      const res=await axios.post(`http://localhost:4000/cart/${itemId}?size=${size}&type=add`,{},{
        headers:{
          token:localStorage.getItem('token')
        }
      })
      if(res.data.success){
        toast.success(res.data.message);
        console.log(res.data)
      }
    }
    catch(err){
      toast.error(err.response.data.message);
    }
  }
  useEffect(() => {
    const info = products.find((item) => item._id === prodId);
    if (info) {
      setProdInfo(info);
      setSize(info.sizes?.[0]);
    }
    checkAuth(); // Just to ensure user is logged in
  }, [prodId, products]);

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
      toast.error("Please Login");
      navigate("/login");
    }
  }

  if (!prodInfo) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="h-fit flex flex-col sm:flex-row items-start gap-2 p-4">
        <ImagePreview image={prodInfo.images} />
        <div className="p-3 flex flex-col gap-6">
          <div className="border-b-1 pb-1.5">
            <h1 className="text-3xl font-bold">{prodInfo.name}</h1>
            <p className="text-wrap sm:w-3/4 pb-2 text-black/50">
              {prodInfo.description}
            </p>
            <p className="flex gap-2 items-center border-black/40 border-1 w-fit p-3 rounded-lg">
              4.3
              <span className="text-green-500">
                <Star fill={"#00c950"} />
              </span>
              <span className="border-l border-black/40 px-2">164 ratings</span>
            </p>
          </div>

          <div>
            <p className="text-green-400 text-4xl">${prodInfo.price}</p>
            <p>inclusive of all taxes</p>
          </div>

          <p className="font-medium scale-125 text-xl w-fit pl-3">
            Available Sizes
          </p>
          <div className="flex gap-3 items-center flex-wrap">
            {prodInfo.sizes.map((item, index) => (
              <p
                key={index}
                className={`p-3 text-xl hover:bg-black font-light text-black/60 border-1 border-black/40 rounded-lg hover:text-white duration-300 ${
                  size === item ? "bg-black text-white" : ""
                }`}
                onClick={() => setSize(item)}
              >
                {item}
              </p>
            ))}
            <p>
              Selected Size - <span className="font-bold text-xl">{size}</span>
            </p>
          </div>

          <button
            className="p-3 rounded-lg border-1 border-black/60 w-fit px-5 hover:bg-black hover:text-white duration-300"
            onClick={() => addToCart(prodInfo._id, size)}
          >
            Add To Cart
          </button>
        </div>
      </div>

      <RelatedProducts category={prodInfo?.category} id={prodInfo?._id} />
    </>
  );
};

export default Product;
