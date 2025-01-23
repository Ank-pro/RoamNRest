import React, { useState, useEffect } from "react";
import "./nav.css";
import searchImg from '../../assets/search.svg';
import userImg from '../../assets/user.svg';
import {SearchComponent} from '../SearchComponent/SearchComponent'
import { GuestSelect } from "../SearchComponent/guest-select/GuestSelect";
import { DestinationSelect } from "../SearchComponent/dest-select/DestinationSelect";
import { useDispatch, useSelector } from "react-redux";
import { showDestinationModal, showGuestModal, showSearchModal } from "../../features/searchBarSlice";

export default function NavBar() {
  
  const {destinationModal,destination,searchModal,guestModal} = useSelector(state => state.search);
  const dispatch = useDispatch();

  function handleSearch() {
    dispatch(showSearchModal(true))
  }

  function handleClose() {
    dispatch(showDestinationModal(false))
    dispatch(showGuestModal(false))
  }

  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      dispatch(showSearchModal(false))
    })
  },[])

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

      {searchModal && (
        <>
          <div className="modal-overlay" onClick={handleClose}></div>
          {guestModal && <GuestSelect/>}
          {destinationModal && destination && <DestinationSelect/>}
          <div className="search-modal">
            <SearchComponent />
          </div>
        </>
      )}
    </>
  );
}