import { useEffect, useState } from "react";
import "./filter.css";
import RangeComponent from "./RangeComponent";
import houseImg from "./assets/house.svg";
import flatImg from "./assets/flat.svg";
import guestImg from "./assets/guest.svg";
import hotelImg from "./assets/hotel.svg";
import { useSelector } from "react-redux";

export const FilterModal = () => {
  const [value, setValue] = useState([850, 20000]);
  const { allHotels } = useSelector((state) => state.home);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [rooms, setRooms] = useState({
    beds: 0,
    bedrooms: 0,
    bathrooms: 0,
  });

  const { beds, bedrooms, bathrooms } = rooms;

  useEffect(() => {
    const hotels = allHotels.filter(
      ({ price, numberOfBathrooms, numberOfBedrooms, numberOfBeds }) =>
        price >= value[0] &&
        price <= value[1] &&
        (bathrooms === 0 || numberOfBathrooms === bathrooms) &&
        (bedrooms === 0 || numberOfBedrooms === bedrooms) &&
        (bedrooms === 0 || numberOfBeds === beds)
    );
    console.log(hotels);
    setFilteredHotels(hotels);
  }, [value, rooms]);

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

  function handleClear() {
    setFilteredHotels([]);
    setRooms({
      beds: 0,
      bedrooms: 0,
      bathrooms: 0,
    });
    setValue([850, 20000]);
  }

  return (
    <div className="filtering">
      <div className="filter-header">
        <div className="close">x</div>
        <span className="filter-label">Filters</span>
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
        <div className="rooms">
          <label className="room-label">Beds and rooms</label>
          <ul className="rooms-category">
            <li className="room-header">Beds</li>
            <div className="range">
              <button
                className="down"
                disabled={false}
                onClick={() => handleDown("beds")}
              >
                -
              </button>
              <span className="beds-value">
                {rooms.beds === 0 ? "Any" : rooms.beds}
              </span>
              <button className="up" onClick={() => handleUp("beds")}>
                +
              </button>
            </div>
            <li className="room-header">Bedrooms</li>
            <div className="range">
              <button
                className="down"
                disabled={false}
                onClick={() => handleDown("bedrooms")}
              >
                -
              </button>
              <span className="beds-value">
                {rooms.bedrooms === 0 ? "Any" : rooms.bedrooms}
              </span>
              <button className="up" onClick={() => handleUp("bedrooms")}>
                +
              </button>
            </div>
            <li className="room-header">Bathroom</li>
            <div className="range">
              <button
                className="down"
                disabled={false}
                onClick={() => handleDown("bathrooms")}
              >
                -
              </button>
              <span className="beds-value">
                {rooms.bathrooms === 0 ? "Any" : rooms.bathrooms}
              </span>
              <button className="up" onClick={() => handleUp("bathrooms")}>
                +
              </button>
            </div>
          </ul>
        </div>
        <hr />
        <div className="property-type">
          <label className="property-label">Property Type</label>
          <ul className="property-contents">
            <li>
              <img src={houseImg} alt="house" height="23" width="23" />
              <span>House</span>
            </li>
            <li>
              <img src={flatImg} alt="flat" height="23" width="23" />
              <span>Flat</span>
            </li>
            <li>
              <img src={hotelImg} alt="hotel" height="23" width="23" />
              <span>Hotel</span>
            </li>
            <li>
              <img src={guestImg} alt="guest-house" height="23" width="23" />
              <span>Guest House</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-result">
        <button id="clear" onClick={handleClear}>Clear All</button>
        <div className="filter-results">
          Show {filteredHotels.length} places
        </div>
      </div>
    </div>
  );
};
