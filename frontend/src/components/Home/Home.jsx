import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./main.css";
import NavBar from "../Navbar/NavBar";
import { HotelCard } from "../HotelCard/HotelCard";
import { Categories } from "../Categories/Categories";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { addHotels } from "../../features/HotelDataSlice";
import { Spinner } from "./Spinner";
import {
  setDates,
  setDestination,
  setGuest,
} from "../../features/searchBarSlice";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const {filteredHotels} = useSelector(state => state.home);

  const dispatch = useDispatch();
  const { selectedCategory, allHotels } = useSelector((state) => state.home);
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/hotel${
          selectedCategory ? `?category=${selectedCategory}` : ""
        }`
      );
      dispatch(addHotels(data));
      setHotels(data ? data.slice(0, 8) : []);
      setHasMore(data.length > 8);
      setCurrentPage(8);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const fetchMoreData = () => {
    if (hotels.length > allHotels.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      if (hotels.length > 0) {
        const newHotels = allHotels.slice(currentPage, currentPage + 8);
        setHotels((prev) => [...prev, ...newHotels]);
        setCurrentPage((prev) => prev + 8);
        if (currentPage + 8 >= allHotels.length) {
          setHasMore(false);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    if(filteredHotels.length > 0){
      const category_hotels = selectedCategory ? filteredHotels.filter(({category}) => category === selectedCategory) : filteredHotels;
      setHotels(category_hotels.slice(0,8));
      setHasMore(category_hotels.length > 8);
      setCurrentPage(8);
      console.log('Category:',selectedCategory)
    }else{
      fetchData();
    }
    
  }, [selectedCategory,filteredHotels]);

  useEffect(() => {
    dispatch(setDestination(null));
    dispatch(setGuest({ adults: 1, childrens: 0, pets: 0 }));
    dispatch(setDates({checkin : new Date(), checkout : null}))
  }, []);

  return (
    <>
      <div className="container">
        <NavBar />
        <Categories />
        <InfiniteScroll
          dataLength={hotels.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={hotels.length > 0 && <Spinner />}
          endMessage={
            !hasMore && (
              <h3 style={{ margin: "2rem 0", textAlign: "center" }}>
                No more hotels to show
              </h3>
            )
          }
          style={{ overflow: "hidden" }}
        >
          <div className="hotel-container">
            {hotels.length > 0 &&
              hotels.map((hotel) => (
                <HotelCard key={hotel._id} hotel={hotel} />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default Home;
