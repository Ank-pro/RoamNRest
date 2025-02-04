import React, { useState, useEffect } from "react";
import "./nav.css";
import searchImg from "../../assets/search.svg";
import userImg from "../../assets/user.svg";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { GuestSelect } from "../SearchComponent/guest-select/GuestSelect";
import { DestinationSelect } from "../SearchComponent/dest-select/DestinationSelect";
import { useDispatch, useSelector } from "react-redux";
import {
  resetSearchBar,
  showDestinationModal,
  showGuestModal,
  showSearchModal,
} from "../../features/searchBarSlice";
import { useNavigate } from "react-router-dom";
import { Modal } from "../Portal/Modal";
import { LoginPage } from "../LoginPage/LoginPage";
import { SignInPage } from "../LoginPage/SignInPage";
import { showAuthModal, showLogin, showSignUp } from "../../features/AuthSlice";
import { UserModal } from "../UserModal/UserModal";


export default function NavBar({ showMinimal = false }) {
  const [userModal, setUserModal] = useState(false);
  const {
    destinationModal,
    destination,
    searchModal,
    guestModal,
    checkInDate,
    checkOutDate,
    guest,
  } = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login, signUp, authModal, user } = useSelector((state) => state.auth);
  const currentUser = JSON.parse(localStorage.getItem('user'))

  function handleSearch() {
    dispatch(showSearchModal(true));
  }

  function handleClose() {
    dispatch(showDestinationModal(false));
    dispatch(showGuestModal(false));
    dispatch(showSearchModal(false));
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      dispatch(showSearchModal(false));
      dispatch(showGuestModal(false));
      dispatch(showDestinationModal(false));
    });
    document.addEventListener("click", () => {
      setUserModal(false);
    });
  }, []);

  function dateDuration(inDate, outDate) {
    const date1 = new Date(inDate);
    const date2 = new Date(outDate);
    const start = date1.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
    const end = date2.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
    return `${start} - ${end}`;
  }

  const totalGuests = () => {
    let total = 0;
    Object.entries(guest).forEach(([key, val]) => (total += val));
    return total;
  };

  function handleAuthModal(e) {
    e.stopPropagation();
    console.log("User ", currentUser);
    if (!currentUser?.token) {
      dispatch(showAuthModal(true));
    } else {
      
      setUserModal((prev) => !prev);
    }
  }
  function handleCloseModal() {
    dispatch(showAuthModal(false));
  }
  function handleResetToHome(){
    dispatch(resetSearchBar());
    navigate('/');
  }


  return (
    <>
      <nav className="navbar">
        <div className="heading" onClick={handleResetToHome}>
          RoamNRest
        </div>

        {!showMinimal && (
          <>
            <div className="navlist" onClick={handleSearch}>
              <li>{destination ? destination : "Anywhere"}</li>
              <span></span>
              <li>
                {checkInDate && checkOutDate && checkInDate !== checkOutDate
                  ? dateDuration(checkInDate, checkOutDate)
                  : "Any week"}
              </li>
              <span></span>
              <li>
                {totalGuests() > 1 ? `${totalGuests()} Guests` : "Add Guests"}
              </li>

              <span></span>
              <li>
                <img src={searchImg} alt="search" height="25" width="25" />
              </li>
            </div>

            <div className="user-section">
              <p className="username">Hi, {currentUser?.name ? currentUser.name : "User"}</p>
              <div className="user-icon" onClick={handleAuthModal}>
                <img src={userImg} alt="user-image" />
              </div>
            </div>
          </>
        )}
      </nav>

      {searchModal && (
        <>
          <div className="modal-overlay" onClick={handleClose}></div>
          {guestModal && <GuestSelect />}
          {destinationModal && destination && <DestinationSelect />}
          <div className="search-modal">
            <SearchComponent />
          </div>
        </>
      )}

      {currentUser?.token ? (
        userModal && (
          <div className="user-m">
            <UserModal />
          </div>
        )
      ) : (
        authModal && <Modal onClose={handleCloseModal}>
          {login && <LoginPage />}
          {signUp && <SignInPage />}
        </Modal>
      )}
    </>
  );
}
