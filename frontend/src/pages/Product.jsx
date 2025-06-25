import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopContext } from "../context/ShopContext";
import ImagePreview from "../components/ImagePreview";
import { Star } from "lucide-react";
import RelatedProducts from "../components/RelatedProducts";
const Product = () => {
  const { prodId } = useParams();
  const [prodInfo, setProdInfo] = useState({});
  const { products } = useContext(shopContext);
  const [size, setSize] = useState("S");
  useEffect(() => {
    const info = products.find((item) => item._id == prodId);
    setProdInfo(info);
    console.log(info);
  }, [prodId]);
  return (
    <>
      <div className="h-[80vh] flex">
        {prodInfo && (
          <div className="flex gap-2 items-center flex-col sm:flex-row">
            <ImagePreview image={prodInfo.image} />
            <div className="p-3 flex flex-col gap-6">
              <div className="border-b-1 pb-1.5">
                <h1 className="text-3xl  font-bold">{prodInfo.name}</h1>
                <p className="text-wrap sm:w-3/4 pb-2  text-black/50">
                  {prodInfo.description}
                </p>
                <p className="flex gap-2 items-center border-black/40 border-1 w-fit p-3 rounded-lg">
                  4.3
                  <span className="text-green-500 ">
                    <Star fill={"#00c950"} />
                  </span>
                  <span className="border-l border-black/40 px-2">
                    164 ratings
                  </span>
                </p>
              </div>
              <div>
                <p className=" text-green-400 text-4xl">${prodInfo.price}</p>
                <p>inclusive of all taxes</p>
              </div>
              <p className="font-medium scale-125 text-xl w-fit pl-3">
                Available Sizes
              </p>
              <div className="flex gap-3 items-center">
                {prodInfo.sizes &&
                  prodInfo.sizes.map((item, index) => {
                    return (
                      <p
                        key={index}
                        className={`p-3 text-xl hover:bg-black font-light text-black/60 border-1 border-black/40 rounded-lg hover:text-white duration-300 ${
                          size === item && "bg-black text-white"
                        }`}
                        onClick={() => {
                          setSize(item);
                        }}
                      >
                        {item}
                      </p>
                    );
                  })}
                <p>
                  Selected Size-
                  <span className="font-bold text-xl">{size}</span>
                </p>
              </div>
              <button className="p-3 rounded-lg border-1 border-black/60 w-fit px-5 hover:bg-black hover:text-white duration-300">
                Add To Cart
              </button>
            </div>
          </div>
        )}
      </div>
      <RelatedProducts category={prodInfo.category}/>
    </>
  );
};

export default Product;
