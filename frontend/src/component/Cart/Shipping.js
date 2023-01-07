import React,{useState} from 'react';
import './Shipping.css';
import {useSelector,useDispatch} from 'react-redux';
import {saveShippingInfo} from '../../actions/cartAction';
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import PhoneIcon from '@mui/icons-material/Phone';
import {State} from 'country-state-city';
import {useAlert} from 'react-alert';
import MetaData from '../layout/MetaData';
import CheckoutStep from './CheckoutStep';
import { useNavigate } from 'react-router-dom';



const Shipping = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {shippingInfo} = useSelector(state=>state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);


  const shippingSubmit=(e)=>{

    e.preventDefault();

    if(phoneNo.length>10||phoneNo.length<10)
    {
        alert.error("Phone no should be 10 digits");
        return;
    }
    dispatch(saveShippingInfo({address,city,state,pinCode,phoneNo}));
    navigate('/order/confirm');
  }


  return (
      <>
          <MetaData title='Checkout' />
          <CheckoutStep activeStep={0} />
          <div className='shipping-container' >
          <div className='shipping-box' >
          <h2 className='shipping-heading' >Shipping Details</h2>
          <form
          className='shipping-form'
          encType='multipart/form-data'
          onSubmit={shippingSubmit}
          >
          <div>
              <HomeIcon/>
              <input
                  type='text'
                  placeholder='Address'
                  required
                  value={address}
                  onChange={(e)=>setAddress(e.target.value)}
              />
          </div>
          <div>
              <LocationCityIcon/>
              <input
                  type='text'
                  placeholder='City'
                  required
                  value={city}
                  onChange={(e)=>setCity(e.target.value)}
              />
          </div>
          <div>
              <PinDropIcon/>
              <input
                  type='number'
                  placeholder='Pin Code'
                  required
                  value={pinCode}
                  onChange={(e)=>setPinCode(e.target.value)}
                  
              />
          </div>
          <div>
              <PhoneIcon/>
              <input
                  type='number'
                  placeholder='Mobile'
                  required
                  value={phoneNo}
                  onChange={(e)=>setPhoneNo(e.target.value)}
                 
              />
          </div>
          <div>
              <PublicIcon/>
               <select
                   required
                   value={state}
                   onChange={(e)=>setState(e.target.value)}
               >
                   <option value='' >State</option>
                   {State&&State.getStatesOfCountry('IN').map(item=>(
                       <option key={item.isoCode} value={item.name} >{item.name}</option>
                   ))}
               </select>
          </div>
          <input
              type='submit'
              value='Continue'
              className='shipping-btn'
              disabled={state?false:true}
          />


          </form>
          </div>

          </div>
      </>
   
  )
}

export default Shipping;
