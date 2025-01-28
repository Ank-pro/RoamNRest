import "./search.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import searchImg from "../../assets/search.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  setDates,
  setDestination,
  showDestinationModal,
  showGuestModal,
  showSearchModal,
} from "../../features/searchBarSlice";
import { useEffect, useState } from "react";
import { GuestSelect } from "./guest-select/GuestSelect";
import { useNavigate } from "react-router-dom";
import { setSingleHotel } from "../../features/HotelDataSlice";

export const SearchComponent = () => {
  const dispatch = useDispatch();
  const {
    destination,
    checkInDate,
    checkOutDate,
    guest: { adults, childrens, pets },
  } = useSelector((state) => state.search);
  const { singleHotel } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const checkInDateObj = checkInDate ? new Date(checkInDate) : null;
  const checkOutDateObj = checkOutDate ? new Date(checkOutDate) : null;
  const totalPets = pets > 0 ? `, ${pets} ${pets === 1 ? "pet" : "pets"}` : "";
  const totalChilds =
    childrens > 0
      ? `, ${childrens} ${childrens === 1 ? "child" : "childs"}`
      : "";
  const totalGuests = `${adults} ${
    adults === 1 ? `adult` : `adults`
  }${totalChilds}${totalPets}`;

  useEffect(() => {
    console.log(checkInDateObj);
  }, [checkInDate]);

  function handleInDate(date) {
    dispatch(setDates({ checkin: date, checkout: checkOutDateObj }));
  }

  function handleOutDate(date) {
    dispatch(setDates({ checkin: checkInDateObj, checkout: date }));
  }

  function handleDestination(e) {
    const address = e.target.value.trim(); //
    dispatch(setDestination(address));
  }

  function handleDestinationModal() {
    dispatch(showDestinationModal(true));
    dispatch(showGuestModal(false));
  }

  function handleGuestModal() {
    dispatch(showDestinationModal(false));
    dispatch(showGuestModal(true));
  }

  function handleSearchedData() {
    try {
      dispatch(showSearchModal(false));
      if (!checkOutDateObj && checkInDateObj) {
        dispatch(
          setDates({ checkin: checkInDateObj, checkout: checkInDateObj })
        );
      }
      console.log(destination)
      dispatch(showDestinationModal(false));
      dispatch(showGuestModal(false));
      if(destination){
      navigate(`/hotels/${destination}`);
      }
      
    } catch (error) {
      console.log("Cannot search empty : ", error);
    }
  }

  return (
    <div className="search-action">
      <div className="where">
        <div className="place">
          <label>Where</label>
          <input
            type="text"
            placeholder="Destination"
            value={destination || ""}
            onChange={handleDestination}
            onFocus={handleDestinationModal}
          />
        </div>
      </div>

      <div className="date-in">
        <div className="place">
          <label>Check-in</label>
          <DatePicker
            selected={checkInDateObj}
            minDate={new Date()}
            placeholderText="Set date"
            onChange={handleInDate}
            closeOnScroll={true}
            dateFormat="dd MMM"
            className="search-date"
            onFocus={() => {
              dispatch(showDestinationModal(false));
              dispatch(showGuestModal(false));
            }}
          />
        </div>
      </div>
      <div className="date-out">
        <div className="place">
          <label>Check-out</label>
          <DatePicker
            selected={checkOutDate}
            minDate={checkInDateObj}
            closeOnScroll={true}
            placeholderText="Set date"
            onChange={handleOutDate}
            dateFormat="dd MMM"
            className="search-date"
            onFocus={() => {
              dispatch(showDestinationModal(false));
              dispatch(showGuestModal(false));
            }}
          />
        </div>
      </div>
      <div className="total-guest">
        <div className="place">
          <label>No. of Guests</label>
          <input
            type="text"
            id="guest-input"
            placeholder="Add guests"
            value={totalGuests}
            onClick={handleGuestModal}
          />
        </div>
        <div className="search-img">
          <img src={searchImg} alt="search" onClick={handleSearchedData} />
        </div>
      </div>
    </div>
  );
};
