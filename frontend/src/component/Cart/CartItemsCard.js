import React from 'react'
import './CartItemsCard.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button,} from '@mui/material';
import { useDispatch } from 'react-redux';
import {addToCart, removeItemsFromCart} from '../../actions/cartAction';
const CartItemsCard = ({item}) => {
    const dispatch = useDispatch();

        const increaseQty=(id,quantity,stock)=>{
            const newQty = quantity+1;
            if(stock<=quantity)return;
            dispatch(addToCart(id,newQty));
        }
        const decreaseQty = (id,quantity)=>{
            const newQty = quantity-1;
            if(quantity<=1)return;
            dispatch(addToCart(id,newQty));
           
        }
        const removeCartItemHandler=(id)=>{
            dispatch(removeItemsFromCart(id));
        }

  return (
    <div className='product-container' >
    <div className='item-image' >
  <div> <img src={item.image} alt='item' /></div>
    </div>
    <div className='item-name' >
      <h4>{item.name}</h4>
    
      <div>
      <button onClick={()=>decreaseQty(item.product,item.quantity)} >-</button>
      <input readOnly value={item.quantity} />
      <button onClick={()=>increaseQty(item.product,item.quantity,item.stock)} >+</button>
      </div>
    </div>
    <div className='item-price' >
     <h4>₹ {item.price*item.quantity}</h4>
    <div>
   <Button sx={{color:'GrayText',fontSize:'10px'}} size='small' onClick={()=>removeCartItemHandler(item.product)} ><DeleteIcon sx={{fontSize:'20px'}} />Remove</Button>
    </div>
     
    </div>
     
    </div>
  )
}

export default CartItemsCard
