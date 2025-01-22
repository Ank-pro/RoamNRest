import { useDispatch, useSelector } from "react-redux";
import './guest.css'
import { setGuest } from "../../../features/searchBarSlice";

export const GuestSelect = () => {
  const dispatch = useDispatch();
  const {
    guest: { adults, childrens, pets },
  } = useSelector((state) => state.search);

  function handleAdd(type) {
    if (type === "adult") {
      dispatch(setGuest({ adults: adults + 1, childrens, pets }));
    } else if (type === "children") {
      dispatch(setGuest({ adults, childrens: childrens + 1, pets }));
    } else {
      dispatch(setGuest({ adults, childrens, pets: pets + 1 }));
    }
  }

  function handleSubtract(type) {
    if (type === "adult") {
      dispatch(setGuest({ adults: adults > 1 ? adults - 1 : 1, childrens, pets }));
    } else if (type === "children") {
      dispatch(setGuest({ adults, childrens: childrens > 0 ? childrens - 1 : 0, pets }));
    } else {
      dispatch(setGuest({ adults, childrens, pets: pets > 0 ? pets - 1 : 0 }));
    }
  }

  console.log(adults)

  return (
    <div className="guest-container">
      <span className="guest-type">Adults</span>

      <div className="quant">
        <span className="change-number" onClick={()=>handleSubtract("adult")}>
          -
        </span>
        <span>{adults}</span>
        <span className="change-number" onClick={()=>handleAdd("adult")}>
          +
        </span>
      </div>

      <span className="guest-type">Children</span>

      <div className="quant">
        <span className="change-number" onClick={()=>handleSubtract("children")}>
          -
        </span>
        <span>{childrens}</span>
        <span className="change-number" onClick={()=>handleAdd("children")}>
          +
        </span>
      </div>

      <span className="guest-type">Pets</span>
      <div className="quant">
        <span className="change-number" onClick={()=>handleSubtract("pet")}>
          -
        </span>
        <span>{pets}</span>
        <span className="change-number" onClick={()=>handleAdd("pet")}>
          +
        </span>
      </div>
    </div>
  );
};
