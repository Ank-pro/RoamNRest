import axios from "axios";
import { useEffect, useState } from "react";
import "./cat.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImg from "../../assets/rightArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  onSelectCategory,
  setCategories,
  setFilteredHotels,
  showFilterModal,
} from "../../features/HotelDataSlice";
import filterImg from "../../assets/filter.svg";
import { FilterModal } from "../Filter/FilterModal";
import { Modal } from "../Portal/Modal";
import { Badge } from "@mui/material";

export const Categories = () => {
  const dispatch = useDispatch();
  const { categories, filterModal, selectedCategory, allHotels } = useSelector(
    (state) => state.home
  );
  const [filteredHotel, setFilteredHotel] = useState([]);
  const getCategories = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/category`);
    dispatch(setCategories(data));
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setFilteredHotel(allHotels);
  }, [allHotels]);

  // filter
  const [value, setValue] = useState([850, 25000]);

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
    const hotels = allHotels.filter(
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
  }, [value, rooms, property]);

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
    setFilteredHotel([]);
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
  }

  function handleFiltered() {
    console.log(filteredHotel)
    dispatch(setFilteredHotels(filteredHotel));
    dispatch(showFilterModal(false));
  }

  const handleCategorySelect = (category) => {
    dispatch(onSelectCategory(category));
    // console.log(category)
  };

  function handleShowFilterModal() {
    dispatch(showFilterModal(true));
  }

  function handleCloseModal() {
    dispatch(showFilterModal(false));
  }

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 10,
    speed: 500,
    slidesToScroll: 3,
    variableWidth: true,
    nextArrow: <img src={sliderImg} alt="slider" />,
    prevArrow: <img src={sliderImg} alt="slider" />,
  };

  return (
    <>
      <div className="category-container">
        <div className="category-slider">
          <Slider {...settings}>
            {categories.map((cat) => (
              <div
                className={`slider ${
                  selectedCategory === cat.category ? "slider-active" : ""
                }`}
                key={cat._id}
                onClick={() => handleCategorySelect(cat.category)}
              >
                {cat.category}
              </div>
            ))}
          </Slider>
        </div>       
          <div className="filter-btn" onClick={handleShowFilterModal}>
            <img
              src={filterImg}
              alt="filter"
              className="filter-img"
              height="19"
              width="19"
            />
            <span>Filter</span>
          </div>
      </div>
      {
        <>
          {filterModal && (
            <Modal onClose={handleCloseModal}>
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
      }
    </>
  );
};
