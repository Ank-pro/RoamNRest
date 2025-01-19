import "./details.css";
import kitchenImg from "./ammenities-images/kitchen.svg";
import wifiImg from "./ammenities-images/wifi.svg";
import washerImg from "./ammenities-images/washer.svg";
import petImg from "./ammenities-images/pet.svg";
import deskImg from "./ammenities-images/desk.svg";
import acImg from "./ammenities-images/ac.svg";

export const HotelDetails = ({ singleHotel }) => {
  const {
    hostName,
    houseRules,
    category,
    country,
    hostJoinedOn,
    numberOfBathrooms,
    numberOfBeds,
    numberOfguest,
  } = singleHotel;
  return (
    <div className="details">
      <div className="rooms-info">
        <span id="loc">
          {category} in {country}
        </span>

        <div className="room-struct">
          <span className="rooms">{numberOfguest} Guests</span>
          <span className="dot"></span>
          <span className="rooms">{numberOfBeds} Bedrooms</span>
          <span className="dot"></span>
          <span className="rooms">{numberOfBathrooms} Bathrooms</span>
        </div>
      </div>

      <div className="host-container">
        <hr />

        <div className="host">
          <span className="host-name">Hosted by {hostName}</span>
          <span className="host-joined">{hostJoinedOn}</span>
        </div>
        <hr />
      </div>

      <div className="place-offers">
        <span className="offers-heading">What this place offers</span>
        <ul className="ammenities">
          <li>
            <img className="am-img" src={wifiImg} alt="kitchen" />
            <span className="am-name">Free Wifi</span>
          </li>
          <li>
            <img className="am-img" src={acImg} alt="kitchen" />
            <span className="am-name">Air Conditioned</span>
          </li>
          <li>
            <img className="am-img" src={kitchenImg} alt="kitchen" />
            <span className="am-name">Kitchen</span>
          </li>
          <li>
            <img className="am-img" src={washerImg} alt="kitchen" />
            <span className="am-name">Washing Machine</span>
          </li>
          <li>
            <img className="am-img" src={deskImg} alt="kitchen" />
            <span className="am-name">Workspace</span>
          </li>
          <li>
            <img className="am-img" src={petImg} alt="kitchen" />
            <span className="am-name">Pets Allowed</span>
          </li>
        </ul>
      </div>

      <div className="rules">
        <span className="rules-heading">House Rules</span>
        <div className="house-rules">
          {houseRules.map((rule) => (
            <ul className="rule-list">
              <li>{rule}</li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};
