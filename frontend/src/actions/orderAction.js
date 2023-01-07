import * as api from '../api/index';
import { CLEAR_ERRORS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from '../constants/orderConstants';

export const myOrders =()=>async(dispatch)=>{
    try {
        dispatch({
            type:MY_ORDERS_REQUEST
        });
        const {data}  = await api.getMyOrders();
        console.log('orders',data.orders);
        dispatch({
            type:MY_ORDERS_SUCCESS,
            payload:data.orders
        })
    } catch (error) {
        dispatch({
            type:MY_ORDERS_FAIL,
            payload:error.response.data.message
        })
    }
}
export const getOrderDetails = (id)=>async(dispatch)=>{
    try {
        dispatch({
            type:ORDER_DETAILS_REQUEST
        })
    const {data}  = await api.getOrderDetails(id);
    console.log(data);
    dispatch({
        type:ORDER_DETAILS_SUCCESS,
        payload:data.order
    })
        
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response.data.message
        })
    }
}







export const clearErrors = ()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}