import React ,{ useContext} from "react"

import './CSS/ShopCatogery.css'
import {ShopContext} from '../Context/ShopContext'
import dropdwon_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
const ShopCategory = (props) => {
    const {all_product} =useContext(ShopContext);
    return(
        <div className='shop-category'>

        <img className ='shopcategory-banner' scr= {props.banner} alt="" />    
        <div className="Shopcatogery-indexSort">
<p>
    <span>Showing 1-12</span>out of 35 products

</p>
<div className="shopcatogery-sort">
sort by <img src={dropdwon_icon} alt =""/>

</div>
        </div>
<div className="ShopCatogery-products">
    {all_product.map((item,i)=>{

        if (props.category===item.category){

return <Item key ={i} id ={item.id} name={item.name}image={item.image}new_price={item.old_price}/>

        }
        else{
            return null;
        }
    })}

</div>
<div className="shopCategory-loadmore">
Explore More

</div>
        </div>
    )
}
export default ShopCategory
