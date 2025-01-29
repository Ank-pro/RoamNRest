import { useSelector } from "react-redux";
import "./login.css";

export const SignInPage = () => {
    const {signUp} = useSelector(state => state.auth);
  return (
    <form className="signup-container">
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
        <label className="name">
          Name <span className="star">*</span>
        </label>
        <input type="text" placeholder="Enter Your Name" required />
      </div>
      <div className="cred-container">
        <label className="email">
          Email <span className="star">*</span>
        </label>
        <input type="email" placeholder="Enter Your Mail" required />
      </div>
      <div className="cred-container">
        <label className="password">
          Password <span className="star">*</span>
        </label>
        <input type="password" placeholder="Enter Your Password" required />
      </div>
      <div className="cred-container">
        <label className="confirm-pass">
          Confirm Password <span className="star">*</span>
        </label>
        <input type="password" placeholder="Enter Your Password" required />
      </div>

      <button className="sign-btn">Create Account</button>
    </form>
  );
};
