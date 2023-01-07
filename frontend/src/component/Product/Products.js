import React,{useEffect, useState} from 'react'
import {useSelector,useDispatch}from "react-redux";
import {clearErrors, getAllProducts} from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard"
import "./Products.css";
import { Link,useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { Slider,Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import NoProducts from './NoProducts';
import MetaData from '../layout/MetaData';


const categories = ["Mobile","Laptop","Camera","Television"];

const Products = () => {
const dispatch  = useDispatch();
const alert = useAlert();
const [currentPage,setCurrentPage] = useState(1);
const [price,setPrice] = useState([0,30000]);
const [category,setCategory] = useState("");
const [ratings,setRatings] = useState(0);
const {loading,products,error,resultPerPage,productsCount,filteredProductCount} = useSelector(state=>state.products);
const {keyword} = useParams();
useEffect(()=>{
    if(error)
    {
        alert.error(error)
        dispatch(clearErrors());
    }
  dispatch(getAllProducts(keyword,currentPage,price,category,ratings));
},[dispatch,keyword,currentPage,alert,error,price,category,ratings]);
const setCurrentPageNo = (e)=>{
    setCurrentPage(e);
}
const priceHandler = (e,newPrice)=>{
    e.stopPropagation();
   setPrice(newPrice);

}
let count = filteredProductCount;
  return (
   <>
       {loading?<Loader/>:<>
      
        
           <MetaData title="Products"/>
          
          {filteredProductCount<1?<div className='noProducts'><NoProducts/></div>: <div className='products' >
           {products&&products.map((product)=><ProductCard key={product._id} product = {product} />)}
           </div>}
           <div className='filterBox' >
                <Typography  >Price</Typography>
                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay='auto'
                    aria-labelledby='range-slider'
                    min={0}
                    max={30000}
                />
                <Typography>Categories</Typography>
                <ul className='categoryBox' >
                   {categories.map(category=>(
                        <li className='category-link'
                         key={category} 
                         onClick={()=>setCategory(category)} >
                            {category}
                        </li>))}
                </ul>
                <fieldset>
                    <Typography component='legend' >Ratings Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e,newRatings)=>setRatings(newRatings)}
                        valueLabelDisplay='auto'
                        aria-labelledby='range-slider'
                        min={0}
                        max={5}             />
                </fieldset>
           </div>
           {resultPerPage<count&& <div className='paginationBox' >
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText='Next'
                prevPageText='Prev'
                firstPageText='1st'
                lastPageText='Last'
                itemClass='page-item'
                linkClass='page-link'
                activeClass='pageItemActive'
                activeLinkClass='pageLinkActive'

            />

           </div>}
       </>}
   </>
  )
}

export default Products
