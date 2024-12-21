import React, { useContext } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const ProuductDisplay = (props) => {
    const { product }= props;
    const{addToCart}=useContext(ShopContext);
     return(
        <div className='prouductDisplay'>
            <div className="prouductDisplay-left">
                <div className="productDisplay-img-list">
                  <img src={product.image} alt=""/>
                  <img src={product.image} alt=""/>
                  <img src={product.image} alt=""/>
                  <img src={product.image} alt=""/>
                    </div>
                    <div className="prouductDisplay-img">
                        <img className='productdisplay-main-img' src={product.image} alt=""/>
                        </div>
                </div>
                <div className="prouductDisplay-right">
                    <h1>{product.name}</h1>
                    <div className="prouductDisplay-right-star">
                        <img src={star_icon } alt=""/>
                        <img src={star_icon } alt=""/>
                        <img src={star_icon } alt=""/>
                        <img src={star_icon } alt=""/>
                        <img src={star_dull_icon} alt=""/>
                        <p>(122)</p>
                        </div>
                        <div className="productdisplay-right-prices">
                            </div>
                            <div className="productdisplay-right-price-old">${product.old_price}</div>
                            <div className="productdisplay-right-price-new">${product.new_price}
                            </div>
                            <div className="productdisplay-right-description">
                                A lightweight, usually Knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
                                </div>
                                <div className="productdisplay-right-size">
                                    <h1>select Size</h1>
                                    <div className="productdisplay-right-sizes">
                                        <div>S</div>
                                        <div>M</div>
                                        <div>L</div>
                                        <div>XL</div>
                                        <div>XXL</div>
                                        </div>
                                    </div>
                                    <button onclick={()=>{addToCart(product.id)}}>ADD TO CART</button>
                                    <p className='productdisplay-right-category'><span>Category :</span>Women , T-shirt, Crop Top</p>
                                    <p className='productdisplay-right-category'><span>Tags :</span>Modern ,Latest </p>
                            
                    </div>
            </div>
     )
} 
export default ProuductDisplay