import React,{useEffect} from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Footer from "./component/layout/Footer/Footer";
import WebFontLoader from "webfontloader";
import Home from "./component/Home/Home";
import Header from "./component/layout/Header/Header";
import ProductDetails from "./component/Product/ProductDetails";
import "./App.css";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignup from "./component/User/LoginSignup";
import {useDispatch} from "react-redux";
import { getUser } from "./actions/userAction";
import Profile from "./component/User/Profile";
import ProductsCategories from "./component/layout/ProductCategories/ProductsCategories";
import AuthRoute from "./component/route/AuthRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";


import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";




function App() {
  const dispatch = useDispatch();
  
 

 


  useEffect(()=>{
      WebFontLoader.load({
        google:{
          families:['Roboto']
        }
      });
    dispatch(getUser());
   
  },[dispatch])
  return (
     <BrowserRouter>
    <Header/>
    <div className="space" >

    </div>
    <ProductsCategories/>
       <Routes>
         <Route exact path="/" element={<Home/>} />                                                
         <Route exact path="/product/:id" element={<ProductDetails/>} />
         <Route exact path="/products" element={<Products/>} />
         <Route  path="/products/:keyword" element={<Products/>} />
         <Route exact path="/search" element={<Search/>} />
         <Route exact path="/login" element={<LoginSignup/>} />
         <Route exact path="/cart" element={<Cart/>} />
         <Route exact path="/password/forgot" element={<ForgotPassword/>} />
         <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
         <Route exact path="/account" element={<AuthRoute><Profile/></AuthRoute>}/>
         <Route exact path="/profile/update" element={<AuthRoute><UpdateProfile/></AuthRoute>} />
         <Route exact path="/password/update" element={<AuthRoute><UpdatePassword/></AuthRoute>} />
         <Route exact path="/shipping" element={<AuthRoute><Shipping/></AuthRoute>} />
         <Route exact path="/order/confirm" element={<AuthRoute><ConfirmOrder/></AuthRoute>} />
         <Route exact path="/success" element={<AuthRoute><OrderSuccess/></AuthRoute>} />
         <Route exact path="/orders" element={<AuthRoute><MyOrders/></AuthRoute>} />
         <Route exact path="/order/:id" element={<AuthRoute><OrderDetails/></AuthRoute>} />
       </Routes>
       <Footer/>
     </BrowserRouter>
   
  );
}

export default App;
