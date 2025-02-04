import { useDispatch, useSelector } from "react-redux";
import { BookedAnimation } from "./BookedAnimation";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successAnimation from "./success.json";
import { resetSearchBar } from "../../features/searchBarSlice";

export const SuccessPage = () => {
  const location = useLocation();
  const orderDetails = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("order-details", orderDetails);

  function handleHomeRedirect(){
    dispatch(resetSearchBar());
    navigate('/')
  }

  return (
    <div className="success-container">
      <div className="success-header">
        <Lottie
          animationData={successAnimation}
          loop={false}
          className="check"
        />
        <span className="booking-text">Booking Successfully</span>
      </div>

      <div className="order-details-container">
        <div className="order-details">
          <span className="booking-header">Booking Details</span>
          <div className="details-grid">
            <p>
              <strong>Hotel:</strong> {orderDetails.hotelName}
            </p>
            <p>
              <strong>Check-in:</strong> {orderDetails.checkIn}
            </p>
            <p>
              <strong>Check-out:</strong> {orderDetails.checkOut}
            </p>
            <p>
              <strong>Guests:</strong> {orderDetails.guests}
            </p>
            <p>
              <strong>Amount Paid:</strong> ₹{orderDetails.amount}
            </p>
            <p>
              <strong>Booking ID:</strong> {orderDetails.bookingId}
            </p>
          </div>
        </div>
        <button className="send-home" onClick={handleHomeRedirect}>Go To Home</button>
      </div>
    </div>
  );
};
