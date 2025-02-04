import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import {
  setUser,
  setErrors,
  setFormValues,
  showAuthModal,
  showLogin,
  showSignUp,
  setOpenSnackBar,
} from "../../features/AuthSlice";
import axios from "axios";
import { loginHandler } from "../../service/loginService";
import { mobileValidate } from "../../utils/mobileRegex";
import { passwordValidate } from "../../utils/passwordRegex";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let isMobileValid, isPasswordValid;
export const LoginPage = () => {
  const dispatch = useDispatch();
  const { formValues, errors, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [userError,setUserError] = useState("")

  async function handleUserLogin(e) {
    e.preventDefault();
    if (!formValues.mobileNumber || !formValues.password) {
      setUserError("All fields required");
      return;
    }
    const res = await loginHandler(
      formValues.mobileNumber,
      formValues.password
    );
    if (res?.status === 200) {
      const {
        user: { name },
        token,
      } = res.data;
      localStorage.setItem('user',JSON.stringify({name,token}))
      const currentUser = JSON.stringify(localStorage.getItem('user'));
      
      dispatch(setOpenSnackBar({type : 'login',status : true}));
      dispatch(setUser(...currentUser));
      setTimeout(() => {
        dispatch(showAuthModal(false));
        
        navigate("/");
      }, 1000);
    }else{
      setUserError("Invalid mobile or password")
    }
  }
  function handleMobile(e) {
    let inputValue = e.target.value;
    dispatch(setFormValues({ mobileNumber: inputValue }));
    setUserError("")
  }

  function handlePassword(e) {
    let inputValue = e.target.value;
    dispatch(setFormValues({ password: inputValue }));
    setUserError("")
  }

  return (
    <div className="login-container">
      <form className="login-form">
        <div className="cred-container">
          <label className="mobile">
            Mobile Number <span className="star">*</span>
          </label>
          <input
            className="mobile"
            onChange={handleMobile}
            type="number"
            placeholder="Enter Your Mobile Number"
            required
          />
          {errors.mobileError && (
            <p className="error-msg">{errors.mobileError}</p>
          )}
        </div>
        <div className="cred-container">
          <label className="password">
            Password <span className="star">*</span>
          </label>
          <input
            type="password"
            onChange={handlePassword}
            placeholder="Enter Your Passworkd"
            required
          />
          {userError && <span className="invalid-user-msg">{userError}</span>}
        </div>

        <button id="user-login-action" onClick={handleUserLogin}>
          Login
        </button>
      </form>
      
    </div>
  );
};
