import { useEffect, useState } from "react";
import "./searched.css";
import NavBar from "../../Navbar/NavBar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HotelCard } from "../../HotelCard/HotelCard";

export const SearchedPage = () => {
  const { address } = useParams();
  const [locationData, setLocationData] = useState([]);

  const { allHotels } = useSelector((state) => state.home);

  useEffect(() => {
    if (allHotels.length > 0) {
      localStorage.setItem("allHotels", JSON.stringify(allHotels));
    }
    const getHotels = JSON.parse(localStorage.getItem('allHotels') || "[]");
    const hotels = getHotels.filter(
      (hotel) => hotel.address.toLowerCase() === address.toLowerCase()
    );
    setLocationData(hotels);
  }, []);

  return (
    <div className="searched-container">
      <NavBar />
      <div className="location-hotels">
        {locationData.map((hotel) => (
          <HotelCard hotel={hotel} />
        ))}
      </div>
    </div>
  );
};
