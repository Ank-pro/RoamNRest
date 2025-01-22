import { useDispatch, useSelector } from "react-redux";
import "./dest.css";
import { useNavigate } from "react-router-dom";
import { setSingleHotel } from "../../../features/HotelDataSlice";

export const DestinationSelect = () => {
  const { allHotels } = useSelector((state) => state.home);
  const { destination } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dest = destination.trim().toLowerCase();
  const searchHotels = destination
    ? allHotels.filter((hotel) =>
        hotel.name.split(" ").join("").toLowerCase().startsWith(dest)
      )
    : [];

  function handleSingleHotel(hotel) {
    dispatch(setSingleHotel(hotel))
    navigate(`/hotel/${hotel.name}/${hotel.address}/${hotel.city}/${hotel._id}/reserve`);
  }

  return (
    <div className="dest-container">
      {searchHotels.length > 0 &&
        searchHotels.map((hotel) => (
          <ul key={hotel._id} className="search-hotels">
            <li onClick={()=>handleSingleHotel(hotel)}>{hotel.name}</li>
          </ul>
        ))}
    </div>
  );
};
