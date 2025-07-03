import {createContext,useState,useEffect} from "react"
// import {products} from "../assets/frontend_assets/assets"
import axios from "axios"
import {toast} from "react-toastify"

export const shopContext=createContext();

const ShopProvider=({children})=>{
    const [cartItems, setcartItems] = useState({});
    const [products,setProducts]=useState([])
    
    async function addToCart(itemId,size){
        const cartClone=structuredClone(cartItems);
        if(cartClone[itemId]){
            if(cartClone[itemId][size]){
                // console.log("number incremented");
                cartClone[itemId][size]+=1;
            }
            else{
                // console.log("new size of item created");
                cartClone[itemId][size]=1
            }
        }
        else{
            // console.log('new item created')
            cartClone[itemId]={}
            cartClone[itemId][size]=1;
        }
        setcartItems(cartClone);
    }
    useEffect(()=>{
        async function fetchProducts(){
            try{
                const res= await axios.get("http://localhost:4000/product/list");
                if(res.data.success){
                    console.log(res.data.products)
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
        cartItems,
        addToCart,
        cartSize:Object.keys(cartItems).length
    }
    return(
        <shopContext.Provider value={value}>
            {children}
        </shopContext.Provider>
    )
}

export default ShopProvider;
