import "./card.css";
import starImg from "../../assets/star.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
  toggleFavourite,
} from "../../features/wishListSlice";
import { useEffect, useState } from "react";
import { showAuthModal } from "../../features/AuthSlice";

export const HotelCard = ({ hotel }) => {
  const { _id, name, city, address } = hotel;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const { wishListHotels, isFavourite } = useSelector(
    (state) => state.wishList
  );

  // if (hotel.length === 0) {
  //   return <p>Loading...</p>;
  // }
  useEffect(() => {
    // console.log(wishListHotels);
    console.log('Access token: ',user.token);
  }, [user.token]);

  const handleSingleHotel = () => {
    console.log(hotel);
    navigate(`/hotel/${name}/${address}/${city}/${_id}/reserve`);
  };

  function handleWishList(e) {
    e.stopPropagation();
    if (user.token) {
      let isPresent = wishListHotels.some((item) => item._id === hotel._id);
      if (isPresent) {
        dispatch(removeFromWishList(hotel));
      } else {
        dispatch(addToWishList({ ...hotel, favourite: true }));
        navigate("/wishList");
      }
      dispatch(toggleFavourite(!isPresent));
    } else {
      dispatch(showAuthModal(true));
    }
  }

  const isHotelFavourite = wishListHotels.some(
    (item) => item._id === hotel._id && item.favourite
  );

  return (
    <div className="card" onClick={handleSingleHotel}>
      <div className="card-img">
        <img src={hotel.image} alt="" />
      </div>
      <div className="card-details">
        <div className="address">
          <p>{`${hotel.address},${hotel.state}`}</p>
          <span>{hotel.name}</span>
          <p id="price">{hotel.price}</p>
        </div>
        <div className="ratings">
          <img src={starImg} alt="star-image" width="15" height="15" />
          <span>{hotel.rating}</span>
        </div>
      </div>

      <span
        className={`material-symbols-rounded fav-icon ${
          isHotelFavourite ? "filled" : ""
        }`}
        onClick={handleWishList}
      >
        favorite
      </span>
    </div>
  );
};
