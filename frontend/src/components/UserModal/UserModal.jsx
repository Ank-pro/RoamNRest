import { useNavigate } from "react-router-dom";
import "./user.css";

export const UserModal = () => {
    const navigate = useNavigate();
  function handleWishList() {
    navigate('/wishList')
  }
  return (
    <div className="user-actions">
      <ul className="user-action-list">
        <li className="wish" onClick={handleWishList}>
          WishList
        </li>
        <hr />
        <li className="logout">Logout</li>
      </ul>
    </div>
  );
};
