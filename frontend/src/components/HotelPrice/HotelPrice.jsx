import { useState } from "react";
import "./price.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setDates } from "../../features/searchBarSlice";

export const HotelPrice = ({ singleHotel }) => {
  // const [selectedDate,setSelectedDate] = useState(new Date())
  const { checkInDate, checkOutDate, guest } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();

  const { rating, price } = singleHotel;

  function handleCheckInChange(date) {
    dispatch(setDates({ checkin: date, checkout: checkOutDate }));
  }

  function handleCheckOutChange(date) {
    dispatch(setDates({ checkin: checkInDate, checkout: date }));
  }

  const totalGuests = () => {
    let total = 0;
    Object.entries(guest).forEach(([key, val]) => (total += val));
    return total;
  };

  const totalNights = Math.ceil(
    (new Date(checkOutDate) - new Date(checkInDate)) / 1000 / 60 / 60 / 24
  );
  return (
    <div className="price-container">
      <div className="price">
        <span id="amount">₹{price} night</span>
        <div id="rating">
          <span>⭐</span>
          <span>{rating}</span>
        </div>
      </div>
      <div className="date-picker">
        <div className="check-in">
          <span>Check-in</span>
          <DatePicker
            selected={checkInDate}
            closeOnScroll={true}
            minDate={new Date()}
            maxDate={checkOutDate && checkOutDate}
            onChange={handleCheckInChange}
            dateFormat="dd/MM/yyyy"
            className="date-input"
          />
        </div>

        <div className="check-out">
          <span>Check-out</span>
          <DatePicker
            selected={checkOutDate}
            closeOnScroll={true}
            minDate={checkInDate}
            onChange={handleCheckOutChange}
            dateFormat="dd/MM/yyyy"
            className="date-input"
          />
        </div>

        <div className="guest-input">
          <input
            type="text"
            placeholder="Guest"
            value={`${totalGuests()} ${totalGuests() > 1 ? "guests" : "guest"}`}
          />
        </div>

        <div className="reserve">
          <button type="button" id="res-btn">
            Reserve
          </button>
        </div>
      </div>
      <div className="booking-price">
        <span className="charges">
          ₹{price} x {checkOutDate && (totalNights === 0 ? 1 : totalNights)}{" "}
          {totalNights > 1 ? "nights" : "night"}
        </span>
        <span className="charges end">₹{price * totalNights}</span>
        <span className="charges">Service fee</span>
        <span className="charges end">₹200</span>
        <hr className="divider" />
        <span className="charges">Total</span>
        <span className="charges end">{price * totalNights + 200}</span>
      </div>
    </div>
  );
};
