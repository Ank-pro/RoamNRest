import { useDispatch } from "react-redux";
import "./login.css";
import { showLogin, showSignUp } from "../../features/AuthSlice";

export const LoginPage = () => {
    const dispatch = useDispatch();


  return (
    <div className="login-container">
      <form className="login-form">
        <div className="cred-container">
          <label className="mobile">
            Mobile Number <span className="star">*</span>
          </label>
          <input
            type="tel"
            placeholder="Enter Your Mobile Number"
            pattern="[0-9]*"
            inputMode="numeric"
            required
            minLength="10"
            maxLength="10"
          />
        </div>
        <div className="cred-container">
          <label className="password">
            Password <span className="star">*</span>
          </label>
          <input type="password" placeholder="Enter Your Passworkd" required />
        </div>

        <button id="user-login-action">Login</button>
      </form>
    </div>
  );
};
