import axios from "axios";
import { useEffect, useState } from "react";
import "./cat.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderImg from "../../assets/rightArrow.svg";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const { data } = await axios.get(`http://localhost:5000/api/category`);
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

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
          <div className="slider" key={cat._id}>
            {cat.category}
          </div>
        ))}
      </Slider>
    </div>
  );
};