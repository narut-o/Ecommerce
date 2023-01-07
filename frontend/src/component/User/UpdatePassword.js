import React,{useState,useEffect} from 'react'
import './UpdatePassword.css';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { clearErrors, updatePassword } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import Loader from '../layout/Loader/Loader';






const UpdatePassword = () => {
    const {isUpdated,error,loading} = useSelector(state=>state.profile);
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();



    const updatePasswordSubmit = (e) => {


        e.preventDefault();
        const myForm = new FormData();
    
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
      };
     
        useEffect(()=>{
               
                if(error)
                {
                    alert.error(error);
                    dispatch(clearErrors());
                }
                if(isUpdated)
                {
                   
                    alert.success('Pasword Updated')
                   
                    navigate('/account');
                    dispatch({
                        type:UPDATE_PASSWORD_RESET
                    })
                }
        },[dispatch,isUpdated,error,navigate,alert]);
    
    
  return (
   <>
       <div className='updatePasswordContainer'>
           <div className='updatePasswordBox'>
          {loading?<Loader/>: <> 
    
    <h2 className="updatePasswordHeading">Update Password</h2>

   <form
     className="updatePasswordForm"
     encType="multipart/form-data"
     onSubmit={updatePasswordSubmit}
   >
     <div className='loginPassword' >
         <VpnKeyIcon/>
         <input
             type='password'
             placeholder='Old Password'
             required
             value={oldPassword}
             onChange={(e)=>setOldPassword(e.target.value)}
         />
      </div>
      <div className='loginPassword' >
         <LockOpenIcon/>
         <input
             type='password'
             placeholder='New Password'
             required
             value={newPassword}
             onChange={(e)=>setNewPassword(e.target.value)}
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
       className="updatePasswordBtn"
     />
   </form>
   </>}

           </div>
       </div>
   </>
    
              
        
  )
}

export default UpdatePassword
