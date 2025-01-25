import "./card.css";
import starImg from "../../assets/star.svg";
import {useNavigate} from 'react-router-dom';

export const HotelCard = ({ hotel }) => {
  const {_id,name,city,address} = hotel;
  const navigate = useNavigate();

  // if (hotel.length === 0) {
  //   return <p>Loading...</p>;
  // }
  const handleSingleHotel = ()=>{
    console.log(hotel)
    navigate(`/hotel/${name}/${address}/${city}/${_id}/reserve`);
  }

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
      <button className="favourite">
        <span className="material-symbols-rounded">favorite</span>
      </button>
    </div>
  );
};
