import React from 'react'
import {Menu,MenuItem ,Button} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useDispatch } from 'react-redux';
import {logout} from '../../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import {useAlert} from 'react-alert';
import './UserOptions.css';

const UserOptions = ({user}) => {
  
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleDashboard = () => {
      handleClose();
      navigate('/dashboard');
    };
    const handleOrders = () => {
        handleClose();
        navigate('/orders');
      };
    const handleProfile = () => {
        handleClose();
        navigate('/account');
     };


    const handleLogout = ()=>{
         dispatch(logout());
         alert.success('Logged Out');
    }
    const handleClose = ()=>{
        setAnchorEl(null);
    }
  
  return (
    <>  
        <div className='option-btn' >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{color:"black"}}
      >
     hi, {user.name}
     </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {user?.role==='admin'&&
        <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
        }
        <MenuItem onClick={handleOrders}><InventoryIcon  style={{paddingRight:'10px'}} />Orders</MenuItem>
        <MenuItem onClick={handleProfile}><PersonIcon style={{paddingRight:'10px'}}/>Profile</MenuItem>
        <MenuItem onClick={handleLogout}><LogoutIcon style={{paddingRight:'10px'}} /> Logout</MenuItem>
      </Menu>
    </div>
    </>
  )
}

export default UserOptions
