import { memo, useEffect, useState } from "react";
import "./searched.css";
import NavBar from "../../Navbar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HotelCard } from "../../HotelCard/HotelCard";
import { Badge } from "@mui/material";
import filterImg from "../../../assets/filter.svg";
import Lottie from "lottie-react";
import noResult from "./noresults.json";
import { setDestination } from "../../../features/searchBarSlice";
import { Modal } from "../../Portal/Modal";
import { FilterModal } from "../../Filter/FilterModal";
import {
  setFilteredHotels,
  setSearchedFilterHotels,
  showFilterModal,
} from "../../../features/HotelDataSlice";

export const SearchedPage = () => {
  const { address } = useParams();
  const [searchFilterModal, setSearchFilterModal] = useState(false);
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);
  const { destination } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const { allHotels,searchedFilterHotels } = useSelector((state) => state.home);

  function best(s1, s2) {
    let n = s1.length;
    let m = s2.length;
    const memo = new Array(n).fill().map(() => new Array(m).fill(-1));
    function solve(i, j, s1, s2) {
      if (i === n) {
        return m - j;
      }
      if (j === m) {
        return n - i;
      }

      if (memo[i][j] !== -1) {
        return memo[i][j];
      }

      if (s1[i] === s2[j]) {
        return (memo[i][j] = solve(i + 1, j + 1, s1, s2));
      }

      let rep = 1 + solve(i + 1, j + 1, s1, s2);
      let rem = 1 + solve(i + 1, j, s1, s2);

      return (memo[i][j] = Math.min(rep, rem));
    }

    return solve(0, 0, s1, s2);
  }

  // filter
  const [value, setValue] = useState([850, 25000]);
  const [filteredHotel, setFilteredHotel] = useState([]);
  const [rooms, setRooms] = useState({
    beds: 0,
    bedrooms: 0,
    bathrooms: 0,
  });
  const [property, setProperty] = useState({
    house: false,
    flat: false,
    hotel: false,
    guestHouse: false,
  });
  const { beds, bedrooms, bathrooms } = rooms;
  const { house, flat, hotel, guestHouse } = property;

  useEffect(() => {
    const hotels = searchedFilterHotels.filter(
      ({
        price,
        numberOfBathrooms,
        numberOfBedrooms,
        numberOfBeds,
        propertyType,
      }) =>
        price >= value[0] &&
        price <= value[1] &&
        (bathrooms === 0 || numberOfBathrooms >= bathrooms) &&
        (bedrooms === 0 || numberOfBedrooms >= bedrooms) &&
        (bedrooms === 0 || numberOfBeds >= beds) &&
        ((!house && !flat && !guestHouse && !hotel) ||
          (house && propertyType === "House") ||
          (hotel && propertyType === "Hotel") ||
          (guestHouse && propertyType === "Guest House") ||
          (flat && propertyType === "Flat"))
    );
    setFilteredHotel(hotels);
  }, [value, rooms, property,searchedFilterHotels]);

  function handleUp(type) {
    setRooms((prev) => {
      return { ...prev, [type]: prev[type] + 1 };
    });
  }

  function handleDown(type) {
    setRooms((prev) => {
      return { ...prev, [type]: prev[type] > 0 ? prev[type] - 1 : 0 };
    });
  }

  function handleProperty(type) {
    setProperty((prev) => {
      return { ...prev, [type]: !prev[type] };
    });
  }

  function handleClear() {
    setRooms({
      beds: 0,
      bedrooms: 0,
      bathrooms: 0,
    });
    setValue([850, 25000]);
    setProperty({
      house: false,
      flat: false,
      hotel: false,
      guestHouse: false,
    });
    
    setFilteredHotel(searchedFilterHotels);
  }

  function handleFiltered() {
    console.log(searchedFilterHotels)
    dispatch(setSearchedFilterHotels(filteredHotel));

    setSearchFilterModal(false);
  }
  function handleSearchPageFilter() {
    setSearchFilterModal(true);
  }
  function handleSuggestedPlace() {
    if (suggestedPlaces.length > 0)
      dispatch(setDestination(suggestedPlaces[0]));
    const getHotels = JSON.parse(localStorage.getItem("allHotels") || "[]");

    const resultHotel = getHotels.filter(
      (item) => item.address.toLowerCase() === suggestedPlaces[0].toLowerCase()
    );
    // console.log(resultHotel)
    dispatch(setSearchedFilterHotels(resultHotel));
    setSuggestedPlaces([]);
  }

  useEffect(() => {
    if (allHotels.length > 0) {
      localStorage.setItem("allHotels", JSON.stringify(allHotels));
    }
    const getHotels = JSON.parse(localStorage.getItem("allHotels") || "[]");
    const hotelsWithAddress = [
      ...new Set(getHotels.map((hotel) => hotel.address)),
    ];
    const exactMatchHotels = getHotels.filter(
      (hotel) => hotel.address.toLowerCase() === address.toLowerCase()
    );
    if (exactMatchHotels.length > 0) {
      dispatch(setSearchedFilterHotels(exactMatchHotels));
      setSuggestedPlaces([]);
      return;
    }
    const hotelsAddressRaw = hotelsWithAddress.map((hotel) =>
      hotel.split(" ").join("").toLowerCase()
    );
    const operations = hotelsAddressRaw.map((hotel) =>
      best(address.toLowerCase(), hotel)
    );

    const minOpr = Math.min(...operations);
    const closestIdxs = operations
      .map((opr, idx) => (opr === minOpr ? idx : -1))
      .filter((idx) => idx !== -1);
    console.log("close Idxs : ", closestIdxs);
    setSuggestedPlaces(closestIdxs.map((idx) => hotelsWithAddress[idx]));

    const hotels = getHotels.filter(
      (hotel) => hotel.address.toLowerCase() === address.toLowerCase()
    );
    dispatch(setSearchedFilterHotels(hotels)) 
    console.log("suggest; ", suggestedPlaces);
  }, [address]);

  return (
    <div className="searched-container">
      <NavBar />

      <div className="suggest-container">
        {suggestedPlaces.length > 0 && (
          <div className="suggestion">
            <span>
              Did you mean{" "}
              {suggestedPlaces.map((place) => (
                <span id="suggested-place" onClick={handleSuggestedPlace}>
                  {place}
                </span>
              ))}
              ?
            </span>
          </div>
        )}

        {suggestedPlaces.length === 0 && (
          <div className="filter-button">
            <div className="search-filter" onClick={handleSearchPageFilter}>
              <img
                src={filterImg}
                alt="filter"
                className="searchedFilter-img"
                height="19"
                width="19"
              />
              <span>Filter</span>
            </div>
          </div>
        )}
      </div>

      <div className="content-container">
        {searchedFilterHotels.length > 0 ? (
          <div className="location-hotels">
            {searchedFilterHotels.map((hotel) => (
              <HotelCard hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="no-hotel">
            <Lottie
              animationData={noResult}
              loop={true}
              className="no-result"
            />
            <span>No Hotels Founds</span>
          </div>
        )}
      </div>
      <>
        {searchFilterModal && (
          <Modal onClose={() => setSearchFilterModal(false)}>
            <FilterModal
              handleUp={handleUp}
              handleDown={handleDown}
              handleClear={handleClear}
              handleFiltered={handleFiltered}
              handleProperty={handleProperty}
              filteredHotel={filteredHotel}
              rooms={rooms}
              property={property}
              value={value}
              setValue={setValue}
            />
          </Modal>
        )}
      </>
    </div>
  );
};
