import { memo, useEffect, useState } from "react";
import "./searched.css";
import NavBar from "../../Navbar/NavBar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HotelCard } from "../../HotelCard/HotelCard";
import { Badge } from "@mui/material";
import filterImg from "../../../assets/filter.svg";

export const SearchedPage = () => {
  const { address } = useParams();
  const [locationData, setLocationData] = useState([]);
  const [suggestedPlaces, setSuggestedPlaces] = useState([]);

  const { allHotels } = useSelector((state) => state.home);

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

  useEffect(() => {
    if (allHotels.length > 0) {
      localStorage.setItem("allHotels", JSON.stringify(allHotels));
    }
    const getHotels = JSON.parse(localStorage.getItem("allHotels") || "[]");
    const hotelsWithAddress = [
      ...new Set(getHotels.map((hotel) => hotel.address)),
    ];
    // console.log(getHotels);
    console.log("Hotel Address : ", hotelsWithAddress);
    const hotelsAddressRaw = hotelsWithAddress.map((hotel) =>
      hotel.split(" ").join("").toLowerCase()
    );
    // console.log('best match : ', bestMatchResult)
    const operations = hotelsAddressRaw.map((hotel) =>
      best(address.toLowerCase(), hotel)
    );
    console.log("operations : ", operations);

    const minOpr = Math.min(...operations);
    const closestIdxs = operations
      .map((opr, idx) => (opr === minOpr ? idx : -1))
      .filter((idx) => idx !== -1);
    console.log("close Idxs : ", closestIdxs);
    setSuggestedPlaces(closestIdxs.map((idx) => hotelsWithAddress[idx]));

    const hotels = getHotels.filter(
      (hotel) =>
        hotel.address.toLowerCase().startsWith(address[0].toLowerCase()) ||
        hotel.address.toLowerCase() === address.toLowerCase()
    );
    // console.log(suggestedPlaces.map((idx) => allHotels[idx]));
    setLocationData(hotels);
  }, [address]);

  return (
    <div className="searched-container">
      <NavBar />

      <div className="suggest-container">
        <div className="suggestion">
          <span>
            Did you mean{" "}
            {suggestedPlaces.map((place) => (
              <span id="suggested-place">{place}</span>
            ))}
            ?
          </span>
        </div>

        <div className="filter-button">
          <Badge
            badgeContent={5}
            color="success"
          >
            <div className="search-filter">
              <img
                src={filterImg}
                alt="filter"
                className="searchedFilter-img"
                height="19"
                width="19"
              />
              <span>Filter</span>
            </div>
          </Badge>
        </div>
      </div>

      <div className="content-container">
        {locationData.length > 0 ? (
          <div className="location-hotels">
            {locationData.map((hotel) => (
              <HotelCard hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="no-hotel">No hotels Found</div>
        )}
      </div>
    </div>
  );
};
