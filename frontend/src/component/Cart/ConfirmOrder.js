import React from 'react';
import './ConfirmOrder.css';
import CheckoutStep from './CheckoutStep';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';


import { createPayment } from '../../api';




const ConfirmOrder = () => {

    const {shippingInfo,cartItems} = useSelector(state=>state.cart);
    const {user}  = useSelector(state=>state.user)
    const navigate = useNavigate();
    const editAddress = ()=>{
        navigate('/shipping');
    }

    let subtotal = cartItems.reduce((acc,cartItems)=>acc+cartItems.price*cartItems.quantity,0);
    const discount = Math.floor(subtotal*0.2);
    const tax = Math.floor(subtotal*0.18);
    const delivery = subtotal>2000?0:199;
    const total = subtotal-discount+tax+delivery;

    async function reqPayment(){
       const {data} = await createPayment(cartItems,shippingInfo,user);
       console.log('hello');

      
       window.location.replace(data.url);


    }

    const proceedToPayment = ()=>{
        const data = {
            subtotal,
            tax,
            total
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data));

        reqPayment();
    }

  return (
   <>
    <MetaData title='Confirm Order' />
    <CheckoutStep activeStep={1} />
    <div className='confirm-order-page' >
    <div className='cart-items' >
    <div className='cart-summary'>
    <h4>Summary Order</h4>
     <p>Check you cart items</p>
    </div>
     <div className='order-items' >
     {cartItems&&cartItems.map((item)=>(
        <div className='item' >
        <div className='item-image'>
        <img src={item.image} alt='product'/>
     </div>
     <div className='item-name' >
     <h4>{item.name}</h4>
     <p>{item.quantity} x {item.price}</p>
     </div>
     <div className='item-price' >
      <h4>₹ {item.quantity*item.price}</h4>
     </div>
    </div>
    ))}
     </div>
    </div>
    <div className='shipping-info'>
      <div className='shipping-info-summary' >
     <h4> Delivery Details</h4>
     <p>Check your address and proceed to the next page to make payment </p>
      </div>
      <div className='address-box' >
      <div className='address-breakup' >
      <div className='address' >
       <div className='address-name' >
       <h4>Delivery</h4>
      <p>{user.name},</p>
      <p>{shippingInfo.phoneNo}</p>
      <p>{shippingInfo.address}</p>
      <p>{shippingInfo.city} ({shippingInfo.pinCode})</p>
      <p>{shippingInfo.state}</p>
       </div>
      </div>
      </div>

      </div>
      <div className='price-break' >
      <div className='subtotal' >
       <div className='subtotal-name' >
       <h4>Subtotal</h4>
      <p>Discount</p>
      <p>Delivery</p>
      <p>tax</p>
       </div>
       <div className='subtotal-value' >
      <h4>₹ {subtotal}</h4>
      <p>₹ {discount}</p>
      <p>{subtotal>2000?'Free':'₹ 199'}</p>
      <p>₹ {tax}</p>
       </div>
      </div>
      <div className='total-price' >
      <h4>Total</h4>
       <h4>₹ {total}</h4>
      </div>
      <div className='pay' >
          <button className='payment-btn' onClick={proceedToPayment} >Proceed to payment</button>
      </div>
      <div className='edit-address' >
      <button onClick={editAddress} className='edit-btn' >Edit Address</button>
      </div>

      </div>
    </div>
  
    </div>
   </>
  )
}

export default ConfirmOrder
