import { useSelector } from "react-redux";
import NavBar from "../Navbar/NavBar";
import "./wish.css";
import { HotelCard } from "../HotelCard/HotelCard";
import { useEffect } from "react";

export const WishList = () => {
  const { wishListHotels } = useSelector((state) => state.wishList);

  useEffect(()=>{
    console.log(wishListHotels)
  },[])

  return (
    <>
      <NavBar showMinimal={true}/>
      <section className="wishlist-hotels">
        {wishListHotels.length > 0
          ? wishListHotels.map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))
          : ""}
      </section>
    </>
  );
};
