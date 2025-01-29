import { useEffect, useState } from "react";
import "./filter.css";
import RangeComponent from "./RangeComponent";
import houseImg from "./assets/house.svg";
import flatImg from "./assets/flat.svg";
import guestImg from "./assets/guest.svg";
import hotelImg from "./assets/hotel.svg";
import { useDispatch, useSelector } from "react-redux";
import closeImg from "./assets/close.svg";
import {
  addHotels,
  setFilteredHotels,
  showFilterModal,
} from "../../features/HotelDataSlice";
import {} from "../../features/HotelDataSlice";

export const FilterModal = () => {
  const [value, setValue] = useState([850, 20000]);
  const { allHotels, filterModal } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [filteredHotel, setFilteredHotel] = useState([]);
  const [rooms, setRooms] = useState({
    beds: 0,
    bedrooms: 0,
    bathrooms: 0,
  });
  const [property, setProperty] = useState({
    house: false,
    flat: false,
    hotel: false,
    guestHouse: false,
  });

  const { beds, bedrooms, bathrooms } = rooms;
  const { house, flat, hotel, guestHouse } = property;

  useEffect(() => {
    setFilteredHotel(allHotels);
  }, [allHotels]);

  useEffect(() => {
    const hotels = allHotels.filter(
      ({
        price,
        numberOfBathrooms,
        numberOfBedrooms,
        numberOfBeds,
        propertyType,
      }) =>
        price >= value[0] &&
        price <= value[1] &&
        (bathrooms === 0 || numberOfBathrooms >= bathrooms) &&
        (bedrooms === 0 || numberOfBedrooms >= bedrooms) &&
        (bedrooms === 0 || numberOfBeds >= beds) &&
        ((!house && !flat && !guestHouse && !hotel) ||
          (house && propertyType === "House") ||
          (hotel && propertyType === "Hotel") ||
          (guestHouse && propertyType === "Guest House") ||
          (flat && propertyType === "Flat"))
    );
    console.log(hotels);
    setFilteredHotel(hotels);
  }, [value, rooms, property]);

  function handleUp(type) {
    setRooms((prev) => {
      return { ...prev, [type]: prev[type] + 1 };
    });
  }

  function handleDown(type) {
    setRooms((prev) => {
      return { ...prev, [type]: prev[type] > 0 ? prev[type] - 1 : 0 };
    });
  }

  function handleProperty(type) {
    setProperty((prev) => {
      return { ...prev, [type]: !prev[type] };
    });
  }

  function handleClear() {
    setFilteredHotel([]);
    setRooms({
      beds: 0,
      bedrooms: 0,
      bathrooms: 0,
    });
    setValue([850, 20000]);
    setProperty({
      house: false,
      flat: false,
      hotel: false,
      guestHouse: false,
    });
  }

  function handleFiltered() {
    dispatch(setFilteredHotels(filteredHotel));
    dispatch(showFilterModal(false));
  }

  return (
    <div className="filtering">
      {/* header */}
      <div className="filter-header">
        <span className="filter-label">Filters</span>
        <img
          className="close"
          onClick={() => dispatch(showFilterModal(false))}
          src={closeImg}
          alt="close-img"
          height="28"
          width="28"
        />
      </div>
      <div className="filter-container">
        <div className="price-range">
          <RangeComponent value={value} setValue={setValue} />
          <div className="prices">
            <div className="amount">
              <span className="amt-header">Minimum</span>
              <span className="amt">{value[0]}</span>
            </div>
            <div className="amount">
              <span className="amt-header">Maximum</span>
              <span className="amt">{value[1]}</span>
            </div>
          </div>
        </div>
        <hr />

        {/* beds */}
        <div className="rooms">
          <label className="room-label">Beds and rooms</label>
          <ul className="rooms-category">
            <li className="room-header">Beds</li>
            <div className="range">
              <button
                className="down"
                disabled={beds === 0}
                onClick={() => handleDown("beds")}
              >
                -
              </button>
              <span className="beds-value">
                {rooms.beds === 0 ? "Any" : `${rooms.beds}+`}
              </span>
              <button className="up" onClick={() => handleUp("beds")}>
                +
              </button>
            </div>
            <li className="room-header">Bedrooms</li>
            <div className="range">
              <button
                className="down"
                disabled={bedrooms === 0}
                onClick={() => handleDown("bedrooms")}
              >
                -
              </button>
              <span className="beds-value">
                {rooms.bedrooms === 0 ? "Any" : `${rooms.bedrooms}+`}
              </span>
              <button className="up" onClick={() => handleUp("bedrooms")}>
                +
              </button>
            </div>
            <li className="room-header">Bathroom</li>
            <div className="range">
              <button
                className="down"
                disabled={bathrooms === 0}
                onClick={() => handleDown("bathrooms")}
              >
                -
              </button>
              <span className="beds-value">
                {rooms.bathrooms === 0 ? "Any" : `${rooms.bathrooms}+`}
              </span>
              <button className="up" onClick={() => handleUp("bathrooms")}>
                +
              </button>
            </div>
          </ul>
        </div>
        <hr />

        {/* property */}
        <div className="property-type">
          <label className="property-label">Property Type</label>
          <ul className="property-contents">
            <li
              className={`property-name ${house ? "activeProperty" : ""}`}
              onClick={() => handleProperty("house")}
            >
              <img src={houseImg} alt="house" height="23" width="23" />
              <span>House</span>
            </li>
            <li
              className={`property-name ${flat ? "activeProperty" : ""}`}
              onClick={() => handleProperty("flat")}
            >
              <img src={flatImg} alt="flat" height="23" width="23" />
              <span>Flat</span>
            </li>
            <li
              className={`property-name ${hotel ? "activeProperty" : ""}`}
              onClick={() => handleProperty("hotel")}
            >
              <img src={hotelImg} alt="hotel" height="23" width="23" />
              <span>Hotel</span>
            </li>
            <li
              className={`property-name ${guestHouse ? "activeProperty" : ""}`}
              onClick={() => handleProperty("guestHouse")}
            >
              <img src={guestImg} alt="guest-house" height="23" width="23" />
              <span>Guest House</span>
            </li>
          </ul>
        </div>
      </div>

      {/* footer */}
      <div className="footer-result">
        <button id="clear" onClick={handleClear}>
          Clear All
        </button>
        <div className="filter-results" onClick={handleFiltered}>
          Show {filteredHotel.length} places
        </div>
      </div>
    </div>
  );
};
