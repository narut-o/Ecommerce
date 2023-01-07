import React from 'react'
import logo from "../../../images/logo.png"
import "./Navbar.css";
import Search from '../../Product/Search';
import { Link } from 'react-router-dom';
import { Button,IconButton,Typography} from '@mui/material';
import UserOptions from './UserOptions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useSelector} from 'react-redux';



const Header = () => {
  const {user,isAuthenticated} =  useSelector(state=>state.user);
  const {cartItems} = useSelector(state=>state.cart);

  return (
      <>
          <div className='navBar' >
          <Link to='/' >
          <div className='left' >
          <img src={logo} alt='electrosphere'/>
          <p>Electroshpere</p>
          </div>
          </Link>
      
       <div className='mid' >
      <Search/>
       <Link  to='/products'><Button  ><Typography>Products</Typography></Button></Link>
       </div>
       <div className='right' >
      <div >
      {isAuthenticated?<div><UserOptions user = {user} /></div>:<div><Link to='/login'> <button className='login-btn'>Login</button></Link></div>}
      </div>
      <div>
      <Link to='/cart' ><IconButton><ShoppingCartIcon/>{cartItems.length!==0&&<span className='cart-item-qty' >{cartItems.length}</span>}</IconButton></Link>
      </div>
       </div>
       
     </div>
      </>
     
  )
}

export default Header
