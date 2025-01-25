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
  showFilterModal,
} from "../../features/HotelDataSlice";
import filterImg from "../../assets/filter.svg";
import { FilterModal } from "../Filter/FilterModal";

export const Categories = () => {
  const dispatch = useDispatch();
  const { categories, filterModal } = useSelector((state) => state.home);

  const getCategories = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/category`);
    console.log(data);
    dispatch(setCategories(data));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategorySelect = (category) => {
    dispatch(onSelectCategory(category));
    // console.log(category)
  };

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
                className="slider"
                key={cat._id}
                onClick={() => handleCategorySelect(cat.category)}
              >
                {cat.category}
              </div>
            ))}
          </Slider>
        </div>
        <div
          className="filter-btn"
          onClick={() => dispatch(showFilterModal(true))}
        >
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
      {filterModal && (
        <>
        <div
          className="filter-modal"
          onClick={() => dispatch(showFilterModal(false))}
        ></div>
        <FilterModal/>
        </>
      )}
    </>
  );
};
