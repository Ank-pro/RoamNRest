import { useNavigate } from "react-router-dom";
import "./user.css";
import { useDispatch } from "react-redux";
import { resetAuth, setOpenSnackBar, setUser } from "../../features/AuthSlice";
import { resetWishList } from "../../features/wishListSlice";
import { resetSearchBar } from "../../features/searchBarSlice";

export const UserModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  function handleWishList() {
    navigate('/wishList')
  }
  function handleLogout(){
    dispatch(resetAuth())
    dispatch(resetWishList());
    dispatch(resetSearchBar());
    dispatch(setOpenSnackBar({type : 'logout',status : true}))
  }
  return (
    <div className="user-actions">
      <ul className="user-action-list">
        <li className="wish" onClick={handleWishList}>
          WishList
        </li>
        <hr />
        <li className="logout" onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
};
