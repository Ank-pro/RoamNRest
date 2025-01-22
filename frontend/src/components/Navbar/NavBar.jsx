import React, { useState, useEffect } from "react";
import "./nav.css";
import searchImg from '../../assets/search.svg';
import userImg from '../../assets/user.svg';
import {SearchComponent} from '../SearchComponent/SearchComponent'
import { GuestSelect } from "../SearchComponent/guest-select/GuestSelect";
import { DestinationSelect } from "../SearchComponent/dest-select/DestinationSelect";

export default function NavBar() {
  const [showModal, setShowModal] = useState(false);

  function handleSearch() {
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  return (
    <>
      <nav className="navbar">
        <div className="heading">RoamNRest</div>

        <div className="navlist" onClick={handleSearch}>
          <li>Anywhere</li>
          <span></span>
          <li>Any week</li>
          <span></span>
          <li>Add Guests</li> 
          <span></span>      
          <li><img src={searchImg} alt="search" height="25" width="25"/></li>
        </div>

        <div className="user-section">
          <p className="username">Hi, User</p>
          <div className="user-icon">
            <img src={userImg} alt="user-image" />
          </div>
        </div>
      </nav>

      {showModal && (
        <>
          <div className="modal-overlay" onClick={handleClose}></div>
          <GuestSelect/>
          <DestinationSelect/>
          <div className="search-modal">
            <SearchComponent />
          </div>
        </>
      )}
    </>
  );
}