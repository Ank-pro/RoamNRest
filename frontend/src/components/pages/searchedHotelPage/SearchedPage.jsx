import { useEffect, useState } from "react";
import "./searched.css";
import NavBar from "../../Navbar/NavBar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HotelCard } from "../../HotelCard/HotelCard";

export const SearchedPage = () => {
    const {address} = useParams();
  const [locationData, setLocationData] = useState([]);

  const {allHotels} = useSelector(state => state.home);

  useEffect(()=>{
    const hotels = allHotels.filter((hotel)=> hotel.address.toLowerCase() === address.toLowerCase());
    setLocationData(hotels);
  },[allHotels,address])

  return (
    <div className="searched-container">
        <NavBar/>
      <div className="location-hotels">
        {locationData.map(hotel => <HotelCard hotel={hotel}/>)}
      </div>
    </div>
  );
};
