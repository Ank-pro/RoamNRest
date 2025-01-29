import { createPortal } from "react-dom";
import { FilterModal } from "../Filter/FilterModal";
import "../Categories/cat.css";
import { useDispatch, useSelector } from "react-redux";
import { showLogin, showSignUp } from "../../features/AuthSlice";

export const Modal = ({ children, onClose }) => {
  const { signUp, login, authModal } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleFormModal(type) {
    if (type === "login") {
      dispatch(showLogin(true));
      dispatch(showSignUp(false));
    } else {
      dispatch(showSignUp(true));
      dispatch(showLogin(false));
    }
  }

  return createPortal(
    <>
      {authModal && (
        <div className="toggle-page">
          <button
            className={`login-btn ${login ? "login-active" : ""}`}
            onClick={() => handleFormModal("login")}
          >
            Login
          </button>
          <button
            className={`signup-btn ${signUp ? "signup-active" : ""}`}
            onClick={() => handleFormModal("create")}
          >
            SignUp
          </button>
        </div>
      )}
      <div className="filter-modal" onClick={onClose}></div>
      <div className="modal-content">{children}</div>
    </>,
    document.getElementById("filter-modal-root")
  );
};
