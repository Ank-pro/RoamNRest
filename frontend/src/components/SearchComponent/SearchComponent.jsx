import "./search.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import searchImg from "../../assets/search.svg";
import { useDispatch, useSelector } from "react-redux";
import { setDates, setDestination } from "../../features/searchBarSlice";
import { useEffect, useState } from "react";
import { GuestSelect } from "./GuestSelect";

export const SearchComponent = () => {
  const dispatch = useDispatch();
  const { destination, checkInDate, checkOutDate,guest } = useSelector(
    (state) => state.search
  );

  const checkInDateObj = checkInDate ? new Date(checkInDate) : null;
  const checkOutDateObj = checkOutDate ? new Date(checkOutDate) : null;

  useEffect(()=>{
    console.log(checkInDateObj)
  },[checkInDate])

  function handleInDate(date){
    dispatch(setDates({checkin : date, checkout : checkOutDateObj}))
  }

  function handleOutDate(date){
    dispatch(setDates({checkin : checkInDateObj, checkout : date}))
  }

  return (
    <div className="search-action">
      <div className="where">
        <div className="place">
          <label>Where</label>
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => dispatch(setDestination(e.target.value))}
          />
        </div>
      </div>

      <div className="date-in">
        <div className="place">
          <label>Check-in</label>
          <DatePicker
            selected={checkInDate}
            placeholderText="Set date"
            onChange={handleInDate}
            closeOnScroll={true}
            dateFormat="dd MMM"
            className="search-date"
          />
        </div>
      </div>
      <div className="date-out">
        <div className="place">
          <label>Check-out</label>
          <DatePicker
            selected={checkOutDate}
            closeOnScroll={true}
            placeholderText="Set date"
            onChange={handleOutDate}
            dateFormat="dd MMM"
            className="search-date"
          />
        </div>
      </div>
      <div className="total-guest">
        <div className="place">
          <label>No. of Guests</label>
          <input type="text" id="guest-input" placeholder="Add guests" value={guest}/>

        </div>
        <div className="search-img">
          <img src={searchImg} alt="search" />
        </div>
      </div>
    </div>
  );
};
