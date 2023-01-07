import React, { useEffect } from 'react';
import './MyOrders.css'
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, myOrders } from '../../actions/orderAction';
import {Link} from 'react-router-dom';

const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {loading, error, orders} = useSelector(state=>state.myOrders);


    useEffect(()=>{
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    },[dispatch,alert,error]);


  return (
    <>
        <MetaData title='My Orders' />
       {loading?<Loader/>: <div className='my-orders-container' >
      
      {orders&&orders.map((order,index)=>(
      <Link to={`/order/${order._id}`} >
      <div className='order-container'key={index} >
        {order.orderItems.map((item,i)=>(
            <div className='order-item' >
               <div className='items' >
                <img src={item.image} alt='product'/>
               <div className='name-qty' >
               <h4>{item.name}</h4>
               <p>Qty x 1</p>
               </div>
                <p>₹ {item.price}</p>
               <div className='status-rate' >
               <h5 className={order.orderStatus==='Processing'?'red-color':'green-color'} >{order.orderStatus}</h5>
               <p>Rate and review</p>
               </div>

               </div>
            </div>
        ))}
       </div>
      </Link>
      ))}

       </div>}
    </>
  )
}

export default MyOrders
