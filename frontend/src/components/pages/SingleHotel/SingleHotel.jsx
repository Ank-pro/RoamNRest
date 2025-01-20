import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './singleHotel.css'
import NavBar from "../../Navbar/NavBar";
import { HotelImages } from "../../HotelImages/HotelImages";
import { HotelDetails } from "../../HotelDetails/HotelDetails";
import { HotelPrice } from "../../HotelPrice/HotelPrice";

export const SingleHotel = () => {
  const { id } = useParams();
  const [singleHotel, setSingleHotel] = useState(null);

  async function fetchHotel() {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/hotel/${id}`);
      console.log(data);
      setSingleHotel(data);
    } catch (error) {
      console.log("Cant find the hotel", error);
    }
  }

  useEffect(() => {
    fetchHotel();
  }, [id]);

  if (!singleHotel) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <main className="single-hotel">
        <HotelImages singleHotel={singleHotel} />
        <div className="hotel-details">
          <HotelDetails singleHotel={singleHotel} />
          <HotelPrice singleHotel={singleHotel}/>
        </div>
      </main>
    </>
  );
};
