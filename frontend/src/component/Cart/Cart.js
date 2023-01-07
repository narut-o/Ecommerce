
import React from 'react'
import './Cart.css';
import CartItemsCard from './CartItemsCard';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';



const Cart = () => {

  const navigate = useNavigate();
  const {cartItems} =  useSelector(state=>state.cart);
  console.log("cart",cartItems);
  
  let subTotalPrice = 0;
   cartItems.forEach((item) => {
     let individiual_price = item.price*item.quantity;
     subTotalPrice+=individiual_price;
   });

  const discount = Math.floor(subTotalPrice*0.20);
  const tax = Math.floor((subTotalPrice-discount)*0.18);
  const total = subTotalPrice - discount+tax;


  const checkoutHandler = ()=>{
       navigate('/login?redirect=/shipping');
  }

  return (
   <>
      {cartItems.length===0?
      <div className='empty-cart' >
     <RemoveShoppingCartIcon/>
     <Typography>No Product In Your Cart</Typography>
     <Link to='/products' >Continue Shopping</Link>
      </div>:<div className='cart-container' >
      <div className='item-container' >
      <div className='cart-title'>
          <h4>Cart</h4>
      </div>
        {cartItems&&cartItems.map((item)=>(<CartItemsCard key={item.product} item={item} />))}
       </div>
       <div className='checkout-container' >
       <div className='delivery-details' >
      <div>
      <input type='text' placeholder='Promo' />
        <input type='submit' value='Apply' / > 
      </div>
       
       </div>
         <div className='sub-total' >
         <div>
          <h4>Subtotal</h4>
          <h5>Discount</h5>
          <h5>Delivery</h5>
          <h5>Tax</h5>
         </div>
         <div>
         <h4>₹ {subTotalPrice}</h4>
          <h5 id='discount-price' > - ₹ {discount}</h5>
          <h5>₹ 0</h5>
          <h5>₹ {tax}</h5>
         </div>
         </div>
         <div className='total' >
         <div>
         <h4>Total</h4>
         <h4>₹ {total}</h4>
         </div>
         <button className='checkout-btn' onClick={checkoutHandler} >Proceed to checkout</button>
         <button className='continue-btn'  >Continue shopping</button>
         </div>
       </div>

      </div>}
   </>
  )
}

export default Cart;
