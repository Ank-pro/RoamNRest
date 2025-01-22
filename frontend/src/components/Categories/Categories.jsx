import axios from "axios";
import { useEffect, useState } from "react";
import "./cat.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImg from "../../assets/rightArrow.svg";
import {useDispatch, useSelector} from 'react-redux'
import { onSelectCategory, setCategories } from "../../features/HotelDataSlice";


export const Categories = () => {
  const dispatch = useDispatch();
  const {categories} = useSelector(state => state.home);

  const getCategories = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/category`);
    console.log(data)
    dispatch(setCategories(data));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategorySelect = (category)=>{
    dispatch(onSelectCategory(category));
    // console.log(category)
  }

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 14,
    speed : 500,
    slidesToScroll: 3,
    variableWidth : true,
    nextArrow: <img src={sliderImg} alt="slider" />,
    prevArrow: <img src={sliderImg} alt="slider"/>
  };

  return (
    <div className="category-slider">
      <Slider {...settings}>
        {categories.map((cat) => (
          <div className="slider" key={cat._id} onClick={()=>handleCategorySelect(cat.category)}>
            {cat.category}
          </div>
        ))}
      </Slider>
    </div>
  );
};