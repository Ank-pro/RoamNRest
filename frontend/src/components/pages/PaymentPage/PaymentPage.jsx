import { useSelector } from "react-redux";
import "./payment.css";
import { useEffect } from "react";

export const PaymentPage = () => {
    const {singleHotel} = useSelector(state => state.home)
  const { image, name, rating,price } = singleHotel;
useEffect(()=>{
    console.log(singleHotel)
},[singleHotel])
  return (
    <div className="payment-container">
        {/* <h1>this is payment</h1> */}
      <div className="confirm-details">
        <span className="confirm-header">Confirm and Pay</span>
      </div>
      <div className="trip-details">
        <div className="hotel-details">
          <div className="hotel-view">
            <img src={image} alt="hotel-image" width="95"height="95"/>
          </div>
          <div className="hotel-prop">
            <span className="prop-name">{name}</span>
            <span className="prop-rating">⭐ {rating}</span>
          </div>
        </div>
        <hr />
        <div className="total-price-container">
          <span className="charges">
            ₹{price} x 2 nights
          </span>
          <span className="charges end">₹{price * 2}</span>
          <span className="charges">Service fee</span>
          <span className="charges end">₹200</span>
          <hr className="divider" />
          <span className="charges">Total</span>
          <span className="charges end">{price * 2 + 200}</span>
        </div>
      </div>
    </div>
  );
};
