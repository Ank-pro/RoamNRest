import { createPortal } from "react-dom";
import { FilterModal } from "../Filter/FilterModal";
import '../Categories/cat.css'
import { useSelector } from "react-redux";

export const Modal = ({children }) => {
  const {filterModal} = useSelector(state => state.home)
  // if (!isOpen) {
  //   return null;
  // }

  return createPortal(
    <>
    <div className={`filter-modal ${(filterModal) ? 'visible' : ''}`}></div>
    <div className="modal-content">{children}</div>
    </>,
    document.getElementById("filter-modal-root")
  );
};
