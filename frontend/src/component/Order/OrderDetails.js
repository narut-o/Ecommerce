import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import './OrderDetails.css';

const OrderDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();

    const { error, order} = useSelector(state=>state.orderDetails);
    const {id} = params;
    

    useEffect(()=>{
         if(error)
         {
            alert.error(error);
            dispatch(clearErrors());
         }
         dispatch(getOrderDetails(id));
    },[alert,dispatch,error,id])
  return (
     <div className='order-details-container' >
     
      <div className='item-order' >
       {order&&order.orderItems?.map((item,index)=>(
           <div className='item-det'  key={index}>
            <img src={item.image}  alt='product'/>
           <div className='order-id' >
           <h4>{item.name}</h4>
           <h6>Payment status -  <p className={order?.paymentInfo?.status==='paid'?'green-color':'red-color'}>{order?.paymentInfo?.status}</p> </h6>
           </div>
            <h5>₹ {item.price}</h5>
            <p>{order?.orderStatus}</p>
           </div>
       ))}
      </div>
      <div className='address'>
        <h4>Delivery details</h4>
        <h5>{order?.user?.name}</h5>
        <p>{order?.shippingInfo?.address}</p>
        <p>{order?.shippingInfo?.city}</p>
        <p>{order?.shippingInfo?.state}</p>
        <h5>Phone number <p>{order?.shippingInfo?.phoneNo}</p></h5>
      </div>
     </div>
  )
}

export default OrderDetails
