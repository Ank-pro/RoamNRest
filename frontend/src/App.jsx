import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { LoginPage } from "./components/LoginPage/LoginPage";
import NavBar from "./components/Navbar/NavBar";
import { HotelCard } from "./components/HotelCard/HotelCard";
import { Categories } from "./components/Categories/Categories";
import { useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/hotel${
          selectedCategory ? `?category=${selectedCategory}` : ""
        }`
      );
      setAllHotels(data);
      setHotels(data ? data.slice(0,8) : []);
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
        setHotels(prev => [...prev,...newHotels]);
        setCurrentPage(prev => prev + 8)
        if(currentPage + 8 >= allHotels.length){
          setHasMore(false)
        }
      }
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  return (
    <>
      <div className="container">
        <NavBar />
        <Categories />
        <InfiniteScroll
        dataLength={hotels.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={hotels.length > 0 && <h3 style={{margin : '2rem 0',textAlign : 'center'}}>Loading...</h3>}
        endMessage = {!hasMore && <h3 style={{margin : '2rem 0',textAlign : 'center'}}>No more hotels to show</h3>}
        style={{overflow : 'hidden'}}

        >
          <div className="hotel-container">
            {hotels.length > 0
            && hotels.map(hotel => <HotelCard key={hotel._id} hotel={hotel}/>)
            }
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}

export default App;
