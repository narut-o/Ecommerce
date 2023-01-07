import React,{useEffect} from 'react'
import {CgMouse} from "react-icons/cg";
import "./Home.css";
import Product from './ProductCard';
import MetaData from '../layout/MetaData';
import { getAllProducts } from '../../actions/productAction';
import {useSelector,useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert";
import { clearErrors } from '../../actions/productAction';
import playstation from '../../images/ps5.png';
import smartphone from '../../images/smartphone.jpg';
import SaleBanner from '../Banner/SaleBanner/SaleBanner';

const Home = () => {
const dispatch  = useDispatch();
const alert = useAlert();
const {loading,products,error} = useSelector(state=>state.products);

useEffect(()=>{
  if(error)
 {
  alert.error(error);
  dispatch(clearErrors());
 }
   
   dispatch(getAllProducts());
},[dispatch,alert,error]);
  return (
      <>
        {loading?<Loader/>: <>
    <MetaData title='Electroshpere' />
       <div className='banner' >
        <SaleBanner/>
         <div className='mid-banner' >
         <div className='Tag-line' >
          <h4>All New Macbook Pro </h4>
          <p>Powered By M2 Chip</p>
          <button>Buy Now</button>
         </div>
          <img src='https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1720&q=80' alt = 'img'/>
         </div>
         <div className='bottom-banner' >
         <div className='main-product' >
          <img src={playstation} alt='img' />
         </div>
         <iframe title='game-trailer' className='game-trailer'
src="https://www.youtube.com/embed/kPh_3R6TioA"  allowfullscreen>
</iframe>

         </div>
       </div>
      <div className='category' >
        <div className='all'>
        <h4 >All Categories</h4>
        </div>
        <div className='smartphone'>
        <h4>smartphone</h4>
         
        </div>
        <div className='home-appliance' >
        <h4 >appliance</h4>
        </div>
        <div className='electronics' >
        <h4 >electronics</h4>
        </div>
      </div>
       <div className='container' id='container' >
        {products&&(products.map((product)=>(
          <Product key={product._id} product = {product} />
        )))}
       </div>
   </>}
      </>
  )
}

export default Home
