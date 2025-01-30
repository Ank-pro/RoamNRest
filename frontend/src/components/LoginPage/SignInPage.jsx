import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { setErrors, setFormValues } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import { emailValidate } from "../../utils/emailRegex";
import { nameValidate } from "../../utils/nameRegex";
import { mobileValidate } from "../../utils/mobileRegex";
import { passwordValidate } from "../../utils/passwordRegex";
import { signUpHandler } from "../../service/signUpService";

let isMobileValid, isMailValid, isNameValid, isPasswordValid, isPasswordMatch;
export const SignInPage = () => {
  const { formValues, errors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [success,setSuccess] = useState("")

  function handleMobile(e) {
    let inputValue = e.target.value;
    isMobileValid = mobileValidate(inputValue);
    if (!inputValue) {
      dispatch(setErrors({ mobileError: "" }));
    } else if (!isMobileValid) {
      dispatch(setErrors({ mobileError: "Invalid Mobile" }));
    } else {
      dispatch(setErrors({ mobileError: "" }));
      dispatch(setFormValues({ mobileNumber: inputValue }));
    }
  }

  function handleName(e) {
    let inputValue = e.target.value;
    isNameValid = nameValidate(inputValue);
    if (!inputValue) {
      dispatch(setErrors({ nameError: "" }));
    } else if (!isNameValid) {
      dispatch(setErrors({ nameError: "Invalid Name" }));
    } else {
      dispatch(setErrors({ nameError: "" }));
      dispatch(setFormValues({ name: inputValue }));
    }
  }

  function handleEmail(e) {
    let inputValue = e.target.value;
    isMailValid = emailValidate(inputValue);
    if (!inputValue) {
      dispatch(setErrors({ emailError: "" }));
    } else if (!isMailValid) {
      dispatch(setErrors({ emailError: "Invalid Email" }));
    } else {
      dispatch(setErrors({ emailError: "" }));
      dispatch(setFormValues({ email: inputValue }));
    }
  }

  function handlePassword(e) {
    let inputValue = e.target.value;
    isPasswordValid = passwordValidate(inputValue);
    if (!inputValue) {
      dispatch(setErrors({ passwordError: "" }));
    } else if (!isPasswordValid) {
      dispatch(
        setErrors({
          passwordError:
            "Password should contain atleast one uppercase,lowercase or special chars",
        })
      );
    } else {
      dispatch(setErrors({ passwordError: "" }));
      dispatch(setFormValues({ password: inputValue }));
    }
  }

  function handleConfirmPassword(e) {
    let inputValue = e.target.value;
    isPasswordMatch = formValues.password === inputValue;
    if (!inputValue) {
      dispatch(setErrors({ passwordMatch: "" }));
    } else if (!isPasswordMatch) {
      dispatch(setErrors({ passwordMatch: "Password does not match" }));
    } else {
      dispatch(setErrors({ passwordMatch: "" }));
      dispatch(setFormValues({ confirmPassword: inputValue }));
    }
  }

  async function handleFormData(e) {
    e.preventDefault();
    const { mobileNumber, email, name, password } = formValues;
    if (
      isMailValid &&
      isMobileValid &&
      isNameValid &&
      isPasswordValid &&
      isPasswordMatch
    ) {
      const res = await signUpHandler(mobileNumber, name, email, password);
      console.log(res.message)
      if(res.message === 'User already exist'){
        dispatch(setErrors({userError : 'User already exist'}))
        alert(errors.userError)
      }else{
        setSuccess('Success')
      }
    }
  }

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <form className="signup-container">
      <div className="cred-container">
        <label>
          Mobile Number <span className="star">*</span>
        </label>
        <input
          type="number"
          onChange={handleMobile}
          className="mobile"
          placeholder="Enter Your Mobile Number"
          required
        />
        {errors.mobileError && (
          <p className="error-msg">{errors.mobileError}</p>
        )}
      </div>

      <div className="cred-container">
        <label>
          Name <span className="star">*</span>
        </label>
        <input
          type="text"
          onChange={handleName}
          placeholder="Enter Your Name"
          required
        />
        {errors.nameError && <p className="error-msg">{errors.nameError}</p>}
      </div>

      <div className="cred-container">
        <label>
          Email <span className="star">*</span>
        </label>
        <input
          type="email"
          onChange={handleEmail}
          placeholder="Enter Your Mail"
          required
        />
        {errors.emailError && <p className="error-msg">{errors.emailError}</p>}
      </div>

      <div className="cred-container">
        <label>
          Password <span className="star">*</span>
        </label>
        <input
          type="password"
          onChange={handlePassword}
          placeholder="Enter Your Password"
          required
        />
        {errors.passwordError && (
          <p className="error-msg">{errors.passwordError}</p>
        )}
      </div>

      <div className="cred-container">
        <label>
          Confirm Password <span className="star">*</span>
        </label>
        <input
          type="password"
          onChange={handleConfirmPassword}
          placeholder="Enter Your Password"
          required
        />
        {errors.passwordMatch && (
          <p className="error-msg">{errors.passwordMatch}</p>
        )}
      </div>

      <button className="sign-btn" onClick={handleFormData}>
        Create Account
      </button>
    </form>
  );
};
