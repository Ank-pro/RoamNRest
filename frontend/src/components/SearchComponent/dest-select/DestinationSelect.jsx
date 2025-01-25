import { useDispatch, useSelector } from "react-redux";
import "./dest.css";
import { useNavigate } from "react-router-dom";
import { setSingleHotel } from "../../../features/HotelDataSlice";
import {
  setDestination,
  showDestinationModal,
  showSearchModal,
} from "../../../features/searchBarSlice";
import { useEffect } from "react";

export const DestinationSelect = () => {
  const { allHotels } = useSelector((state) => state.home);
  const { destination } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dest = destination.toLowerCase() || "";
  const searchHotels = dest
    ? Array.from(
        new Set(
          allHotels
            .filter((hotel) =>
              hotel.address.split(" ").join("").toLowerCase().startsWith(dest)
            )
            .map((hotel) => hotel.address)
        )
      ).map((uniqueAddress) => {
        const hotel = allHotels.find(
          (hotel) => hotel.address === uniqueAddress
        );
        return { address: hotel.address, state: hotel.state, id: hotel._id };
      })
    : [];

  console.log(searchHotels);

  function handleSetLocation(hotel) {
    // const {_id,name,city,address} = hotel;
    // navigate(`/hotel/${name}/${address}/${city}/${_id}/reserve`);
    // dispatch(showSearchModal(false))
    dispatch(setDestination(hotel.address));
    dispatch(showDestinationModal(false));
    // dispatch(setDestination(hotel.name))
  }

  return (
    <>
      {dest ? (
        <div className="dest-container">
          {searchHotels.map((hotel) => (
            <ul key={hotel._id} className="search-hotels">
              <li
                onClick={() => handleSetLocation(hotel)}
                // style={{
                //   backgroundImage: `url(${hotel.image})`,
                //   backgroundSize: "cover",
                //   backgroundPosition: "center",
                // }}
              >
                {`${hotel.address}, ${hotel.state}`}
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
