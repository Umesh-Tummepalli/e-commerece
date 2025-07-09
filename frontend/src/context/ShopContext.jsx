import {createContext,useState,useEffect} from "react"
// import {products} from "../assets/frontend_assets/assets"
import axios from "axios"
import {toast} from "react-toastify"

export const shopContext=createContext();

const ShopProvider=({children})=>{
    const [products,setProducts]=useState([])
    
    useEffect(()=>{
        async function fetchProducts(){
            try{
                const res= await axios.get("http://localhost:4000/product/list");
                if(res.data.success){
                    setProducts(res.data.products);
                }
                else{
                    toast.error(res.data.message)
                }
            }
            catch(err){
                console.log(err);
                toast.error(err.response.data.message);
            }
        }
        fetchProducts();
    },[])
    const value={
        products,
    }
    return(
        <shopContext.Provider value={value}>
            {children}
        </shopContext.Provider>
    )
}

export default ShopProvider;
