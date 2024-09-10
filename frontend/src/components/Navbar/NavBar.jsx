import React from "react";
import "./nav.css";
import searchImg from '../../assets/search.svg';
import userImg from '../../assets/user.svg'

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="heading">RoamNRest</div>
      <div className="navlist">
        <li>Anywhere</li>
        <span></span>
        <li>Any week</li>
        <span></span>
        <li>Add Guests</li> 
        <span></span>      
         <li> <img src={searchImg} alt="search" height="25" width="25"/></li>
      </div>
      <div className="user-section">
        <p className="username">Hi, User</p>
        <div className="user-icon">
          <img src={userImg} alt="user-image" />
        </div>
      </div>
    </nav>
  );
}
