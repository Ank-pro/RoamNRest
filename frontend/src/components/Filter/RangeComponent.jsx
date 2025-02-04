import React, { useEffect, useState } from "react";
import { Slider, Box, Typography } from "@mui/material";
import "./filter.css";

const RangeComponent = ({ value, setValue }) => {
  //   const [value, setValue] = useState([850, 20000]);
  const minPrice = 850;
  const maxPrice = 25000;
  const steps = 10;

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const renderTowers = () => {
    const towers = [];
    const range = maxPrice - minPrice;
    const numberOfTowers = range / steps;

    for (let i = 0; i <= numberOfTowers; i++) {
      const currentValue = minPrice + i * steps;
      const isActive =
        currentValue >= value[0] && currentValue <= value[1] ? "active" : "";
      towers.push(
        <div
          key={i}
          className={`tower ${isActive}`}
          style={{
            height: `${(currentValue / maxPrice) * 100}%`,
            left: `${(i / numberOfTowers) * 100}%`,
          }}
        ></div>
      );
    }
    return towers;
  };

  return (
    <Box
      sx={{
        maxWidth: 525,
        margin: "auto",
        position: "relative",
        // border : '1px solid black',
      }}
    >
      <Typography
        variant="h6"
        sx={{display: "inline" }}
      >
        Price Range
      </Typography>

      <div className="slider-container">
        <Slider
          value={value}
          onChange={handleChange}
          min={minPrice}
          max={maxPrice}
          step={steps}
          valueLabelDisplay="auto"
          sx={{
            color: "rgb(117, 201, 112)",
            "& .MuiSlider-thumb": {
              width: 15,
              height: 15, 
            },
            "& .MuiSlider-track": {
              height: 4, 
            },
            "& .MuiSlider-rail": {
              height: 4, 
            },
          }}
        />
        <div className="towers">{renderTowers()}</div>
      </div>
    </Box>
  );
};

export default RangeComponent;
