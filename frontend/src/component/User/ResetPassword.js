import React,{useState,useEffect} from 'react'
import './ResetPassword.css';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { clearErrors, resetPassword } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate ,useParams} from 'react-router-dom';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';


const ResetPassword = () => {
    const {isAuthenticated,error,loading} = useSelector(state=>state.forgotPassword);
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const alert = useAlert();



    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
    
        myForm.set("password",password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(params.token,myForm));
      };
     
        useEffect(()=>{
               
                if(error)
                {
                    alert.error(error);
                    dispatch(clearErrors());
                }
                if(isAuthenticated)
                {
                   
                    alert.success('Pasword Updated')
                   
                      navigate('/account');
                    
                    
                }
        },[dispatch,isAuthenticated,error,navigate,alert]);
    
    
  return (
   <>
       <div className='resetPasswordContainer'>
           <div className='resetPasswordBox'>
          {loading?<Loader/>: <> 
    
    <h2 className="resetPasswordHeading">Update Password</h2>

   <form
     className="resetPasswordForm"
     onSubmit={resetPasswordSubmit}
   >
   
      <div className='loginPassword' >
         <LockOpenIcon/>
         <input
             type='password'
             placeholder='New Password'
             required
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
         />
      </div>
      <div className='loginPassword' >
         <LockIcon/>
         <input
             type='password'
             placeholder='Confirm Password'
             required
             value={confirmPassword}
             onChange={(e)=>setConfirmPassword(e.target.value)}
         />
      </div>
    
   
    
     <input
       type="submit"
       value="Update"
       className="resetPasswordBtn"
     />
   </form>
   </>}

           </div>
       </div>
   </>
    
              
        
  )
}


export default ResetPassword;
