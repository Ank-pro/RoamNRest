import React, { useState, useEffect } from "react";
import "./nav.css";
import searchImg from "../../assets/search.svg";
import userImg from "../../assets/user.svg";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { GuestSelect } from "../SearchComponent/guest-select/GuestSelect";
import { DestinationSelect } from "../SearchComponent/dest-select/DestinationSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  showDestinationModal,
  showGuestModal,
  showSearchModal,
} from "../../features/searchBarSlice";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const {
    destinationModal,
    destination,
    searchModal,
    guestModal,
    checkInDate,
    checkOutDate,
    guest,
  } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSearch() {
    dispatch(showSearchModal(true));
  }

  function handleClose() {
    dispatch(showDestinationModal(false));
    dispatch(showGuestModal(false));
    dispatch(showSearchModal(false))
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      dispatch(showSearchModal(false));
      dispatch(showGuestModal(false));
      dispatch(showDestinationModal(false))
    });
  }, []);

  function dateDuration(inDate, outDate) {
    const date1 = new Date(inDate);
    const date2 = new Date(outDate);
    const start = date1.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
    const end = date2.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
    return `${start} - ${end}`;
  }

  const totalGuests = () => {
    let total = 0;
    Object.entries(guest).forEach(([key, val]) => (total += val));
    return total;
  };

  return (
    <>
      <nav className="navbar">
        <div className="heading" onClick={()=> navigate('/')}>RoamNRest</div>

        <div className="navlist" onClick={handleSearch}>
          <li>{destination ? destination : "Anywhere"}</li>
          <span></span>
          <li>
            {checkInDate && checkOutDate && checkInDate !== checkOutDate
              ? dateDuration(checkInDate, checkOutDate)
              : "Any week"}
          </li>
          <span></span>
          <li>
            {totalGuests() > 1 ? `${totalGuests()} Guests` : "Add Guests"}
          </li>

          <span></span>
          <li>
            <img src={searchImg} alt="search" height="25" width="25" />
          </li>
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
          {guestModal && <GuestSelect />}
          {destinationModal && destination && <DestinationSelect />}
          <div className="search-modal">
            <SearchComponent />
          </div>
        </>
      )}
    </>
  );
}
