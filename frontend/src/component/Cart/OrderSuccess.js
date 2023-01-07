import React from 'react';
import './OrderSuccess.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom'



const OrderSuccess = () => {
  return (
   <div className='order-success-container' >
  
   <div className='success-message-box' >
      <CheckCircleOutlineIcon/>
      <h4>Order Placed Successfully</h4>
     <Link to='/orders' > <Button variant='contained' className='order-btn'  >View Orders</Button></Link>
   </div>

   </div>
  )
}

export default OrderSuccess
