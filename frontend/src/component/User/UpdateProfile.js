import React,{useState,useEffect} from 'react'
import "./LoginSignup.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import {useSelector,useDispatch} from "react-redux";
import {clearErrors,getUser} from "../../actions/userAction";
import {useAlert} from 'react-alert';
import Loader from "../layout/Loader/Loader";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { updateProfile } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

import './UpdateProfile.css';


const UpdateProfile = () => {
     
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {user} = useSelector(state=>state.user);
    const {error,loading,isUpdated} = useSelector(state=>state.profile);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [avatar,setAvatar] = useState();
    const [avatarPreview,setAvatarPreveiw] = useState('/Profile.png');


  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };
  const updateProfileImage = (e)=>{
    
    const reader  =  new FileReader();

     reader.onload=()=>{
         if(reader.readyState===2)
         {
             setAvatarPreveiw(reader.result);
             setAvatar(reader.result);
         }
     }
     reader.readAsDataURL(e.target.files[0]);
    }
    useEffect(()=>{
            if(user)
            {
                setName(user.name);
                setEmail(user.email);
                setAvatarPreveiw(user.avatar.url);
            }
            if(error)
            {
                alert.error(error);
                dispatch(clearErrors());
            }
            if(isUpdated)
            {
               
                alert.success('Profile Updated')
                dispatch(getUser());
                navigate('/account');
                dispatch({
                    type:UPDATE_PROFILE_RESET
                })
            }
    },[user,dispatch,isUpdated,error,navigate,alert]);


    
  return (
    <>
     
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
            {loading?<Loader/>:<>  <h2 className="updateProfileHeading">Update Profile</h2>

<form
  className="updateProfileForm"
  encType="multipart/form-data"
  onSubmit={updateProfileSubmit}
>
  <div className="updateProfileName">
    <FaceIcon />
    <input
      type="text"
      placeholder="Name"
      required
      name="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>
  <div className="updateProfileEmail">
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

  <div id="updateProfileImage">
    <img src={avatarPreview} alt="Avatar Preview" />
    <input
      type="file"
      name="avatar"
      accept="image/*"
      onChange={updateProfileImage}
    />
  </div>
  <input
    type="submit"
    value="Update"
    className="updateProfileBtn"
  />
</form></>}
            </div>
          </div>
        </>
    
    </>
  )
}

export default UpdateProfile
