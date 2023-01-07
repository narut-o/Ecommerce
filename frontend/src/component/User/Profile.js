import React from 'react'
import './Profile.css';
import MetaData from '../layout/MetaData';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Profile = () => {
    const {user}  = useSelector(state=>state.user);
  return (
    <>
        <MetaData title='My Profile' />
        <div className='profile-container' >
           <div>
               <h1>My Profile</h1>
               <img
                   src={user?.avatar?.url}
                   alt = {user?.name}
               />
               <Link to='/profile/update' >Edit Profile</Link>
           </div>
           <div>
           <div>
           <h4>Full Name</h4>
           <p>{user?.name}</p>
           </div>
           <div>
               <h4>Email</h4>
               <p>{user?.email}</p>
           </div>
           <div>
               <Link to='/orders' >My Orders</Link>
               <Link to='/password/update' >Change Password</Link>
           </div>


           </div>
        </div>
    </>
  )
}

export default Profile
