import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css'
import { LoginPage } from './components/LoginPage/LoginPage';
import NavBar from './components/Navbar/NavBar';
import { HotelCard } from './components/HotelCard/HotelCard';


function App() {
  const [hotels,setHotels] = useState([]);

  useEffect(()=>{
    async function getData(){
      const hotel = await axios.get('http://localhost:5000/api/hotel');
      console.log(hotel.data);
      setHotels(hotel.data);
    }
    getData();
  },[])


  return (
    <>
      <div className="container">
        <NavBar/>
        <HotelCard hotels = {hotels}/>
      </div>
    </>
  )
}

export default App
