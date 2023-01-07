import React,{useEffect, useState} from 'react'
import { clearErrors, getProductDetails, newReview } from '../../actions/productAction';
import {useSelector,useDispatch} from "react-redux";
import Carousel from "react-material-ui-carousel";
import { useParams} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import './ProductDetails.css'
import ReviewCard from './ReviewCard';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { addToCart } from '../../actions/cartAction';
import MetaData from '../layout/MetaData';
import { Dialog,DialogActions,DialogContent,DialogTitle,Button, Rating } from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';


const ProductDetails = () => {
const dispatch = useDispatch();
const {loading,product,error}  = useSelector(state=>state.productDetails);
const{success,error:reviewError} = useSelector(state=>state.newReview);
const {id} = useParams();
const alert = useAlert();

  
useEffect(()=>{
  if(error)
  {
    alert.error(error);
    dispatch(clearErrors());
  }
  if(reviewError)
  {
    alert.error(reviewError);
    dispatch(clearErrors());
  }
     if(success)
     {
       alert.success('Review submitted');
       dispatch({type:NEW_REVIEW_RESET});
     }
      dispatch(getProductDetails(id));
},[dispatch,id,alert,error,success,reviewError]);
console.log(product);
const options={
  edit:false,
  color:"rgba(20,20,20,0.1)",
  activeColor:"tomato",
  value:product?.ratings,
  isHalf:true,
  size:window.innerWidth<600 ?20:25

}
const [quantity,setQuantity] = useState(1);
const [open,setOpen] = useState(false);
const [rating,setRating] = useState(0);
const [comment,setComment] = useState('');

const increaseQty = ()=>{
    if(product.stock<=quantity)return;
    setQuantity((prevQty)=>prevQty+1);
}
const decreaseQty = ()=>{
   if(quantity>1)
   {
    setQuantity((prevQty)=>prevQty-1)
   }
} 
const addToCartHandler = ()=>{
  dispatch(addToCart(id,quantity));
  alert.success('item added to cart');
}
const submitReviewToggle = ()=>{
  open?setOpen(false):setOpen(true);
}
const reviewSubmitHandler = ()=>{
  const myForm = new FormData();
  myForm.set('rating',rating);
  myForm.set('comment',comment);
  myForm.set('productId',id);

  dispatch(newReview(myForm));
  setOpen(false);
}
  return (
    
  <>
    {loading?<Loader/>: <>
    <MetaData title={`${product?.name}`}/>
     <div className='productDetails' >
     
    
       <div className='carousel'>

       {product&&product.images.map((image,i)=>(
           <img src={image.url} key={image.url} alt = {`${i} Slide`} className = 'caraoselImage' height='800vh' width='400vw'/>
         ))}
       </div>

     <div>
       <div className='detailsBlock-1' >
       <h2>{product?.name}</h2>
      
       </div>
       <div className='detailsBlock-2' >
         <ReactStars {...options} />
         <span>({product?.numberOfReviews} Reviews)</span>
       </div>
       <div className='detailsBlock-3' >
       <h1>₹ {product?.price}</h1>
       <div className='detailsBlock-3-1' >
         <div className='detailsBlock-3-1-1' >
         <button onClick={decreaseQty} >-</button>
         <input readOnly value={quantity} type='number' />
         <button onClick={increaseQty}>+</button>
         </div>
         <button disabled={product?.stock<1?true:false} onClick={addToCartHandler} >Add to Cart</button>
       </div>
      <p>
        Status:<b className={product?.stock<1?'red-color':'green-color'} >
          {product?.stock<1?"Out of Stock":"In Stock"}
        </b>
      </p>
       </div>
       <div className='detailsBlock-4' >
      
         Description: <p>{product?.description}
       </p>
       </div>
       <button onClick={()=>submitReviewToggle()} className='submitReview' >Submit Review</button>
     </div>
     </div>
     <h3 className='reviewsHeading' >Reviews</h3>

     <Dialog
     aria-labelledby='simple-dialog-title'
     open={open}
     onClose={submitReviewToggle}
     >
      <DialogTitle>Submit Review</DialogTitle>
      <DialogContent className='submit-dialog' >
      <Rating
        onChange={(e)=>setRating(e.target.value)}
        value={rating}
        size='large'
      />
      <textarea
        className='submit-dialog-textarea'
        cols='30'
        rows='5'
        value={comment} 
        onChange={(e)=>setComment(e.target.value)}
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={submitReviewToggle} >Cancel</Button>
        <Button onClick={()=>reviewSubmitHandler()} >Submit</Button>
      </DialogActions>
     </Dialog>
     {product?.reviews&&product?.reviews[0]?(
       <div className='reviews' >
       {product?.reviews&&product?.reviews.map((review)=><ReviewCard review={review} />)}

       </div>
     ):(<p className='noReviews' >No reviews yet</p>)}
   </>}
  </>
  )
}

export default ProductDetails
