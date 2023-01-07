import React,{useRef,useState,useEffect} from 'react'
import "./LoginSignup.css";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import {clearErrors,login, register} from "../../actions/userAction";
import {useAlert} from 'react-alert';
import Loader from "../layout/Loader/Loader";
import { useNavigate,useLocation } from 'react-router-dom';


const LoginSignup = () => {
    const {error,loading,isAuthenticated} = useSelector(state=>state.user);
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const location = useLocation();
    const [loginEmail,setLoginEmail] = useState('');
    const [loginPassword,setLoginPassword] = useState('');
    const [avatar,setAvatar] = useState();
    const [avatarPreview,setAvatarPreveiw] = useState('/Profile.png');
    const [user,setUser] = useState({
         name:'',
         email:'',
         password:''
    });
    const {name,email,password} = user;
    const redirect = location.search ? location.search.split('=')[1]:'/account';
  
    useEffect(()=>{
        if(error)
        {
            alert.error(error);
            dispatch(clearErrors())
        }
        if(isAuthenticated)
        {
             navigate(redirect);
        }
    },[error,dispatch,alert,navigate,isAuthenticated,redirect]);

    const loginSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword));
    }
    const registerSubmit = (e)=>{
        e.preventDefault();

        const myForm = new FormData();
        myForm.set('name',name);
        myForm.set('email',email);
        myForm.set('password',password);
        myForm.set('avatar',avatar);
        dispatch(register(myForm));

    }
   
    const switchTab = (e,tab)=>{
        if(tab==='login')
        {
            console.log(tab);
            switcherTab.current.classList.add('shiftToNeutral');
            switcherTab.current.classList.remove('shiftToRight');
            
            registerTab.current.classList.remove('shiftToNeutralForm');
            loginTab.current.classList.remove('shiftToLeft');
        }
        if(tab==='register')
        { 
            switcherTab.current.classList.add('shiftToRight');
            switcherTab.current.classList.remove('shiftToNeutral');
           
            
            registerTab.current.classList.add('shiftToNeutralForm');
            loginTab.current.classList.add('shiftToLeft');
        }
    }

    const registerDataChangeHandler = (e)=>{
            if(e.target.name==='avatar')
            {
                const reader = new FileReader();
                reader.onload = ()=>{
                    if(reader.readyState===2)
                    {
                        setAvatarPreveiw(reader.result);
                        setAvatar(reader.result);
                    }
                }
                reader.readAsDataURL(e.target.files[0]);

            }else{
                setUser({...user,[e.target.name]:e.target.value});
            }
    }


  return (
  <>
      {loading?<Loader/>: <>
       <div className='loginSignupContainer' >
        <div className='loginSignupBox' >
       <div>
       <div className='login_signup_toggle'>
            <p onClick={(e)=>switchTab(e,'login')} >LOGIN</p>
            <p onClick={(e)=>switchTab(e,'register')}>REGISTER</p>
        </div>
        <button ref={switcherTab}></button>
       </div>
       <form className='loginForm' ref={loginTab} onSubmit={loginSubmit} >
       <div className='loginEmail'>
       <MailOutlineIcon/>
       <input 
           type='email'
           placeholder='Email'
           required
           value={loginEmail}
           onChange={(e)=>setLoginEmail(e.target.value)}
       />
       </div>
       <div className='loginPassword' >
          <LockOpenIcon/>
          <input
              type='password'
              placeholder='Password'
              required
              value={loginPassword}
              onChange={(e)=>setLoginPassword(e.target.value)}
          />
       </div>
       <Link to='/password/forgot'>Forgot Password ?</Link>
       <input type='submit' value='Login' className='loginBtn' />
       </form>
       <form className='signUpForm' ref={registerTab} encType='multipart/form-data' onSubmit={registerSubmit} >
       <div className='signUpName' >
       <FaceIcon/>
       <input
           type='text'
           placeholder='Name'
           required
           name='name'
           value={name}
           onChange={registerDataChangeHandler}
       />
       </div>
       <div className='signUpEmail' >
       <MailOutlineIcon/>
       <input
            type='email'
           placeholder='Email'
           required
           name='email'
           value={email}
           onChange={registerDataChangeHandler}
       />
       </div>
       <div  className='signUpPassword'>
       <LockOpenIcon/>
          <input
              type='password'
              placeholder='Password'
              required
              value={password}
              name='password'
              onChange={registerDataChangeHandler}
          />
       </div>
       <div id='registerImage' >
       <img src={avatarPreview} alt='avatar' />
           <input
            type='file'
            name='avatar'
            accept='image/*'
            onChange={registerDataChangeHandler}
           />
       </div>
       <input
           type='submit'
           value='Register' 
           className = 'signUpBtn'
       />
         
       </form>
        </div>
       </div>
   </>}
  </>
  )
}

export default LoginSignup

