import {createContext,useState,useEffect} from "react"
import {products} from "../assets/frontend_assets/assets"


export const shopContext=createContext();

const ShopProvider=({children})=>{
    const [cartItems, setcartItems] = useState({});
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
        console.log(cartItems);
    },[cartItems])
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
