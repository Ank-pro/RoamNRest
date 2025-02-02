
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import { SingleHotel } from "./components/pages/SingleHotel/SingleHotel";
import NavBar from "./components/Navbar/NavBar";
import { SearchComponent } from "./components/SearchComponent/SearchComponent";
import { SearchedPage } from "./components/pages/searchedHotelPage/SearchedPage";
import { WishList } from "./components/WishList/WishList";
import { PaymentPage } from "./components/pages/PaymentPage/PaymentPage";
import { SuccessPage } from "./components/Success/SuccessPage";

function App() {

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<NavBar/>}/> */}
        <Route path="/" element={<Home/>}/>
        <Route path="/hotel/:name/:address/:city/:id/reserve" element={<SingleHotel/>}/>
        <Route path="/hotels/:address" element={<SearchedPage/>}/>
        <Route path="/wishlist" element={<WishList/>}/>
        <Route path="/book/stay/:id" element={<PaymentPage/>}/>
        <Route path="/success" element={<SuccessPage/>}/>
      </Routes>
      
    </>
  );
}

export default App;
