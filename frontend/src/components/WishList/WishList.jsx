import { useSelector } from "react-redux";
import NavBar from "../Navbar/NavBar";
import "./wish.css";
import { HotelCard } from "../HotelCard/HotelCard";
import { useEffect } from "react";
import Lottie from "lottie-react";
import emptyAnimation from "./empty.json";
import { useNavigate } from "react-router-dom";

export const WishList = () => {
  const { wishListHotels } = useSelector((state) => state.wishList);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(wishListHotels);
  }, []);

  function handleNavWishList(){
    navigate('/')
  }

  return (
    <div className="wishlist-container">
      <NavBar showMinimal={true} />
      {wishListHotels.length === 0 ? (
        <div className="empty-page">
          <Lottie
            animationData={emptyAnimation}
            loop={true}
            className="empty-wishlist"
          />
          <div className="empty-wish-container">
            <span className="empty-msg">
              Your wishlist is empty, Add some to show here.
            </span>
            <button onClick={handleNavWishList}>Start adding to your Wishlist</button>
          </div>
        </div>
      ) : (
        <div className="wish-hotel-container">
          <h1 className="wish-header-main">WishList</h1>
        <section className="wishlist-hotels">
          {wishListHotels.length > 0
            ? wishListHotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))
            : ""}
        </section>
        </div>
      )}
    </div>
  );
};
