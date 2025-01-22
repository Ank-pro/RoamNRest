import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import './singleHotel.css'
import NavBar from "../../Navbar/NavBar";
import { HotelImages } from "../../HotelImages/HotelImages";
import { HotelDetails } from "../../HotelDetails/HotelDetails";
import { HotelPrice } from "../../HotelPrice/HotelPrice";
import { useDispatch, useSelector } from "react-redux";
import { setSingleHotel } from "../../../features/HotelDataSlice";

export const SingleHotel = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {singleHotel} = useSelector(state => state.home)

  async function fetchHotel() {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/hotel/${id}`);
      dispatch(setSingleHotel(data));
      // console.log(singleHotel);
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
