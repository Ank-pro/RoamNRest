import { useEffect, useState } from "react";
import "./price.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setDates, setGuest } from "../../features/searchBarSlice";
import { useNavigate } from "react-router-dom";
import { PriceGuestModal } from "./PriceGuestModal";

export const HotelPrice = ({ singleHotel }) => {
  // const [selectedDate,setSelectedDate] = useState(new Date())
  const {
    checkInDate,
    checkOutDate,
    guest: { adults, childrens, pets },
  } = useSelector((state) => state.search);

  let inDate = new Date(checkInDate);
  let outDate = new Date(checkOutDate);

  const [gModal, setgModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rating, price, _id } = singleHotel;

  function handleCheckInChange(date) {
    dispatch(setDates({ checkin: date ? date.toISOString() : inDate, checkout: checkOutDate }));
  }

  function handleCheckOutChange(date) {
    dispatch(setDates({ checkin: checkInDate, checkout: date ? date.toISOString() : outDate }));
  }

  function handleBooking() {
    navigate(`/book/stay/${_id}`);
  }

  function handleGModal(e) {
    e.stopPropagation();
    setgModal((prev) => !prev);
  }

  const totalNights = Math.ceil(
    (new Date(checkOutDate) - new Date(checkInDate)) / 1000 / 60 / 60 / 24
  );
  const totalGuests = adults + childrens + pets;

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
            selected={inDate}
            closeOnScroll={true}
            minDate={new Date()}
            onChange={handleCheckInChange}
            dateFormat="dd/MM/yyyy"
            className="date-input"
          />
        </div>

        <div className="check-out">
          <span>Check-out</span>
          <DatePicker
            selected={outDate}
            closeOnScroll={true}
            minDate={inDate}
            onChange={handleCheckOutChange}
            dateFormat="dd/MM/yyyy"
            className="date-input"
          />
        </div>

        <div className="guest-input">
          <input
            type="text"
            placeholder="Guest"
            readOnly
            value={`${totalGuests > 1 ? `${totalGuests} guests` : `1 guest`}`}
            onClick={handleGModal}
          />
        </div>
        {gModal && (
          <PriceGuestModal
            pets={pets}
            adults={adults}
            childrens={childrens}
            gModal={gModal}
            setgModal={setgModal}
          />
        )}

        <div className="reserve">
          <button type="button" id="res-btn" onClick={handleBooking}>
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
