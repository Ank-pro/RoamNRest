import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { LoginPage } from "./components/LoginPage/LoginPage";
import NavBar from "./components/Navbar/NavBar";
import { HotelCard } from "./components/HotelCard/HotelCard";
import { Categories } from "./components/Categories/Categories";
import { useSelector } from "react-redux";

function App() {
  const [hotels, setHotels] = useState([]);

  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const fetchData =  async()=>{
    try {
      const {data} = await axios.get(`http://localhost:5000/api/hotel${selectedCategory ? `?category=${selectedCategory}` : ''}`);
      setHotels(data)
    } catch (error) {
      console.log('Error :',error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  return (
    <>
      <div className="container">
        <NavBar />
        <Categories />
        <main className="hotel-container">
          {hotels && hotels.map((hotel) => (
            <HotelCard hotel={hotel} key={hotel._id} />
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
