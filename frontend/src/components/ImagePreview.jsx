import React,{useState,useEffect} from 'react'

const ImagePreview = (props) => {
    const {image}=props;
    const [mainImage,setMainImage]=useState(null);
    useEffect(()=>{
        setMainImage(image&&image[0] || null);
    },[image])
  return (
    <div className="flex  flex-col gap-5 items-center sm:flex-row sm:w-1/2 sm:gap-2 m-4 justify-between">
      <div className="flex gap-3 w-full justify-around sm:flex-col overflow-x-auto items-center">
        {
            image && image.map((element,index) => {
                return(
                    <img src={element} alt={`image${index}`} key={index} className={`w-20 rounded-lg ${mainImage===element&& 'border-2'}`}
                    onClick={()=>{
                        setMainImage(element);
                    }}
                    />
                )
            })
        }
      </div>
      <div className="w-[90vw] max-w-[400px] h-full align-middle overflow-hidden rounded-xl">
      {mainImage&&<img src={mainImage} alt="" className=" rounded-lg w-full hover:scale-125 duration-500"/>}
      </div>
    </div>
  )
}

export default ImagePreview
