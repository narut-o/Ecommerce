import axios from "axios";

const API = axios.create({baseURL:'http://localhost:4000/api/v1',withCredentials:true});


//Products api endpoint
export const getAllProducts = (keyword,page,price,category,ratings=0)=>{
    if(category)
    {
       return API.get(`/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`)
    }
    else{
      return  API.get(`/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`)
    }
}
export const getProductDetails = (id)=>API.get(`/product/${id}`);

//User api endpoint
export const login = (email,password)=>{
  const config = {headers:{'Content-Type':'application/json'}};
 return API.post('/login',{email,password},config);
};

export const signup = (userData)=>{
  const config = {headers:{'Content-Type':'mulipart/form-data'}};
  return API.post('/register',userData,config);
}
export const getUser = ()=>API.get('/profile');
export const logout = ()=>API.get('/logout');
export const updateProfile = (userData)=>{
  const config = {headers:{'Content-Type':'mulipart/form-data'}};
  return API.put('/me/update',userData,config);
}
export const updatePassword = (password) =>API.put('/password/update',password);
export const forgotPassword = (email)=>API.post('/password/forgot',email);
export const resetPassword = (token,passwords)=>API.put(`/password/reset/${token}`,passwords);
export const getProduct = (id)=>API.get(`/product/${id}`);
export const createPayment = (cartItems,shippingInfo,user) => API.post('/payment/request',{cartItems,shippingInfo,user});
export const getMyOrders = ()=>API.get('/orders/myorders');
export const getOrderDetails = (id)=>API.get(`/order/${id}`);
export const createReview = (reviewData)=>API.put('/review',reviewData);



 