import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import {
  setUser,
  setErrors,
  setFormValues,
  showAuthModal,
  showLogin,
  showSignUp,
} from "../../features/AuthSlice";
import axios from "axios";
import { loginHandler } from "../../service/loginService";
import { mobileValidate } from "../../utils/mobileRegex";
import { passwordValidate } from "../../utils/passwordRegex";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

let isMobileValid, isPasswordValid;
export const LoginPage = () => {
  const dispatch = useDispatch();
  const { formValues, errors,user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, [user]);

  async function handleUserLogin(e) {
    e.preventDefault();
    // console.log(formValues);
    if (!formValues.mobileNumber || !formValues.password) {
      console.log("All fields required");
      return;
    }
    const res = await loginHandler(
      formValues.mobileNumber,
      formValues.password
    );
    if (res?.status === 200) {
      const {user : {name},token} = res.data;
      // console.log(name,token)
      dispatch(setUser({name,token}))
      setTimeout(() => {
        dispatch(showAuthModal(false));
        navigate("/");
      }, 1000);
    }
  }
  function handleMobile(e) {
    let inputValue = e.target.value;
    dispatch(setFormValues({ mobileNumber: inputValue }));
  }

  function handlePassword(e) {
    let inputValue = e.target.value;

    dispatch(setFormValues({ password: inputValue }));
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
        </div>

        <button id="user-login-action" onClick={handleUserLogin}>
          Login
        </button>
      </form>
    </div>
  );
};
