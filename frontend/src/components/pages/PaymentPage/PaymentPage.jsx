import { useDispatch, useSelector } from "react-redux";
import "./payment.css";
import { useEffect } from "react";
import NavBar from "../../Navbar/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { setSingleHotel } from "../../../features/HotelDataSlice";
import axios from "axios";

export const PaymentPage = () => {
  const { id } = useParams();
  const { singleHotel } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkInDate, checkOutDate, guest } = useSelector(
    (state) => state.search
  );

  async function fetchHotel() {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/hotel/${id}`);
      // console.log(data);
      dispatch(setSingleHotel(data));
    } catch (error) {
      console.log("Cant find the hotel", error);
    }
  }
  useEffect(() => {
    console.log(singleHotel);
    fetchHotel();
  }, [id]);

  const inDate = new Date(checkInDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const outDate = new Date(checkOutDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const totalGuest = () => {
    let total = 0;
    Object.entries(guest).forEach(([key, val]) => (total += val));
    return total;
  };

  const loadScript = (source) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = source;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  if (!singleHotel) {
    return <div>Loading...</div>;
  }

  const { image, name, rating, price, address } = singleHotel;
  const totalAmountToBePaid = price * 2 + 200;

  async function handleConfirmBooking() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      console.log({ msg: "Error while loading SDK" });
    }
    const options = {
      key: "rzp_test_QmLwAcpbdsqwX0",
      amount: totalAmountToBePaid * 100,
      currency: "INR",
      name: "RoamNRest",
      email: "ank@gmail.com",
      contact: "9876543211",
      description: "Thank you for booking with us",
      handler: function (response) {
        const stateData = {
          amount: totalAmountToBePaid,
          hotelName: name,
          guests: totalGuest(),
          checkIn: inDate,
          checkOut: outDate,
          bookingId: response.razorpay_payment_id,
        };

        navigate("/success", {
          state: stateData,
        });
        console.log("State being passed:", stateData);
      },
      prefill: {
        name: "Ankush Kushwaha",
        email: "ank@gmail.com",
        contact: "9876543211",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <NavBar showMinimal={true} />
      <div className="payment-container">
        <div className="confirm-details">
          <div className="trip-info">
            <h2>Confirm and Pay</h2>
            <span className="your-trip">Your Trip</span>

            <div className="trip-date-container">
              <span className="trip-prop-header">Dates</span>
              <span className="info">
                {inDate} - {outDate}
              </span>
            </div>

            <div className="trip-guest-container">
              <span className="trip-prop-header">Guests</span>
              <span className="info">{totalGuest()} Guests</span>
            </div>

            <div className="payment-partner">
              <h3>Pay with</h3>
              <div className="razor-pay">Razorpay</div>
              <button id="razor-btn" onClick={handleConfirmBooking}>
                Confirm Booking
              </button>
            </div>
          </div>
        </div>

        <div className="trip-details">
          <div className="hotel-payment-details">
            <div className="hotel-view">
              <img src={image} alt="hotel-image" />
            </div>

            <div className="hotel-prop">
              <span className="prop-name">{name}</span>
              <div className="address-rating">
                <span className="prop-address">{address}</span>
                <span className="prop-rating">⭐{rating}</span>
              </div>
            </div>
          </div>
          <hr className="hotel-divider" />

          <div className="total-price-container">
            <span className="total-charges">₹{price} x 2 nights</span>
            <span className="total-charges end">₹{price * 2}</span>
            <span className="total-charges">Service fee</span>
            <span className="total-charges end">₹200</span>
            <hr className="total-price-divider" />
            <span className="total-charges">Total</span>
            <span className="total-charges end">{totalAmountToBePaid}</span>
          </div>
        </div>
      </div>
    </>
  );
};
