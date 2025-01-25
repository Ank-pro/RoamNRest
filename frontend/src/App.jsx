
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import { SingleHotel } from "./components/pages/SingleHotel/SingleHotel";
import NavBar from "./components/Navbar/NavBar";
import { SearchComponent } from "./components/SearchComponent/SearchComponent";
import { SearchedPage } from "./components/pages/searchedHotelPage/SearchedPage";

function App() {

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<NavBar/>}/> */}
        <Route path="/" element={<Home/>}/>
        <Route path="/hotel/:name/:address/:city/:id/reserve" element={<SingleHotel/>}/>
        <Route path="/hotels/:address" element={<SearchedPage/>}/>
      </Routes>
      
    </>
  );
}

export default App;
