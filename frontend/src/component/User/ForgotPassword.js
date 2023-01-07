import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {clearErrors, forgotPassword} from '../../actions/userAction';
import './ForgotPassword.css';


const ForgotPassword = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {error,message,loading} = useSelector(state=>state.forgotPassword);

    const [email,setEmail] = useState('');
    const forgotPasswordSubmit = (e)=>{
      e.preventDefault();
      dispatch(forgotPassword({email}));
    }

    useEffect(()=>{
      if(error)
      {
        alert.error(error);
        dispatch(clearErrors());
      }
      if(message)
      {
        alert.success(message);
      }
    },[alert,dispatch,error,message]);
    

  return (
    <>
    <MetaData title="Forgot Password" />
    <div className="forgotPasswordContainer">
      <div className="forgotPasswordBox">
      {loading?<Loader/>:<>  <h2 className="forgotPasswordHeading">Update Profile</h2>

<form
className="forgotPasswordForm"
onSubmit={forgotPasswordSubmit}
>

<div className="forgotPasswordEmail">
<MailOutlineIcon />
<input
type="email"
placeholder="Email"
required
name="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
</div>

<input
type="submit"
value="SEND"
className="forgotPasswordBtn"
/>
</form></>}
      </div>
    </div>
  </>
  )
}

export default ForgotPassword
