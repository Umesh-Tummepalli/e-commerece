import {createContext} from "react"
import {products} from "../assets/frontend_assets/assets"


export const shopContext=createContext();

const ShopProvider=({children})=>{
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
