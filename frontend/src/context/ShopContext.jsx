import {createContext,useState} from "react"
import {products} from "../assets/frontend_assets/assets"


export const shopContext=createContext();

const ShopProvider=({children})=>{
    const [cartItems, setcartItems] = useState([]);
    async function addToCart(itemId,size){
        if(itemId){
            setcartItems(prev=>[...prev,{itemId,size}])
        }
    } 
    const value={
        products,
        cartItems,
        addToCart
    }
    return(
        <shopContext.Provider value={value}>
            {children}
        </shopContext.Provider>
    )
}

export default ShopProvider;
