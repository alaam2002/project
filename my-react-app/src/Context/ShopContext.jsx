import react, { createContext } from "react"

//import react, { useState } from 'react'
import all_product from "../Components/Assets/all_product";

export const ShopContext=createContext(null);
const contextValue={all_product};
const getDefaultCart =()=>{
let cart ={};
for( let index=0; index< all_product.length+1;index++){
cart[index]=0;


}
return cart;}
const ShopContextProvidor=(props)=>{

const [cartItems,setCartItem]= react.useState(getDefaultCart() );
//const contextValue={all_product,cartItems};
const addToCart=(itemId)=>{
setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
console.log(cartItems);

}






const removefromCart=(itemId)=>{
    setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    
    
    }
    const contextValue={all_product,cartItems,addToCart,removefromCart};
//console.log(cartItems);
    return(
<ShopContext.Provider value={contextValue}>
{props.children}


</ShopContext.Provider>

    )

}
export default ShopContextProvidor;