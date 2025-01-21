import { useState } from "react";
import "./price.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const HotelPrice = ({ singleHotel }) => {
    const [selectedDate,setSelectedDate] = useState(new Date())

  const { rating, price } = singleHotel;
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
            selected={selectedDate}
            closeOnScroll = {true}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="date-input"
          />
        </div>

        <div className="check-out">
            <span>Check-out</span>
          <DatePicker
            selected={new Date()}
            closeOnScroll = {true}
            onChange={(date) => console.log(date)}
            dateFormat="dd/MM/yyyy"
            className="date-input"
          />
        </div>
 
        <div className="guest-input">
            <input type="text" placeholder="Guest" />
        </div>

        <div className="reserve">
            <button type="button" id="res-btn">Reserve</button>
        </div>
      </div>
      <div className="booking-price">
        <span className="charges">₹{price} x 2 nights</span>
        <span className="charges end">₹{price}</span>
        <span className="charges">Service fee</span>
        <span className="charges end">₹200</span>
        <hr className="divider" />
        <span className="charges">Total</span>
        <span className="charges end">₹5300</span>
      </div>
    </div>
  );
};
