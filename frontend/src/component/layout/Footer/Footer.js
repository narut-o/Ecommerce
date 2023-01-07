import React from 'react'
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
   <footer id='footer' >

   <div className='leftFooter' >
     <h4>Download Our App</h4>
     <p>Download app for android and ios</p>
     <img src={playstore} alt='playstore' />
     <img src={appstore} alt='appstore' />
   </div>
   <div className='midFooter' >
     <h1>ElectroSphere</h1>
     <p>Any thing and Every thing</p>
     <p>Copyrights 2022 &copy; Akash</p>
   </div>
   <div className='rightFooter' >
   <h4>Follow us on </h4>
   <a href='insta' >Instagram</a>
   <a href='insta' >Facebook</a>
   <a href='insta' >Twitter</a>

   </div>

   </footer>
  )
}

export default Footer
