import { useDispatch, useSelector } from "react-redux";
import "./dest.css";
import { useNavigate } from "react-router-dom";
import { setSingleHotel } from "../../../features/HotelDataSlice";
import { setDestination, showSearchModal } from "../../../features/searchBarSlice";
import { useEffect } from "react";

export const DestinationSelect = () => {
  const { allHotels } = useSelector((state) => state.home);
  const { destination } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dest = destination?.name?.trim().toLowerCase() || "";
  const searchHotels = dest
    ? allHotels.filter((hotel) =>
        hotel.name.split(" ").join("").toLowerCase().startsWith(dest)
      )
    : [];

  function handleSetHotel(hotel) {
    // const {_id,name,city,address} = hotel;
    // navigate(`/hotel/${name}/${address}/${city}/${_id}/reserve`);
    // dispatch(showSearchModal(false))
    dispatch(setDestination(hotel))
    // dispatch(setDestination(hotel.name)) 

  }
  

  return (
    <>
      {dest ? (
        <div className="dest-container">
          {searchHotels.map((hotel) => (
            <ul key={hotel._id} className="search-hotels">
              <li
                onClick={() => handleSetHotel(hotel)}
                // style={{
                //   backgroundImage: `url(${hotel.image})`,
                //   backgroundSize: "cover",
                //   backgroundPosition: "center",
                // }}
              >
                {hotel.name}
              </li>
            </ul>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
