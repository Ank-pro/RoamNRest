import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { resetAuth, resetForm, setErrors, setFormValues } from "../../features/AuthSlice";
import { useEffect, useState } from "react";
import { emailValidate } from "../../utils/emailRegex";
import { nameValidate } from "../../utils/nameRegex";
import { mobileValidate } from "../../utils/mobileRegex";
import { passwordValidate } from "../../utils/passwordRegex";
import { signUpHandler } from "../../service/signUpService";
import { Alert, Snackbar } from "@mui/material";

let isMobileValid, isMailValid, isNameValid, isPasswordValid, isPasswordMatch;
export const SignInPage = () => {
  const { formValues, errors } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [userSnack, setUserSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // useEffect(()=>{
  //   alert(errors.userError);
  // },[errors.userError])

  function handleMobile(e) {
    let inputValue = e.target.value;
    isMobileValid = mobileValidate(inputValue);
    dispatch(setFormValues({ mobileNumber: inputValue }));
    if (!inputValue) {
      dispatch(setErrors({ mobileError: "" }));
    } else if (!isMobileValid) {
      dispatch(setErrors({ mobileError: "Invalid Mobile" }));
    } else {
      dispatch(setErrors({ mobileError: "" }));
      
    }
  }

  function handleName(e) {
    let inputValue = e.target.value;
    isNameValid = nameValidate(inputValue);
    dispatch(setFormValues({ name: inputValue }));
    if (!inputValue) {
      dispatch(setErrors({ nameError: "" }));
    } else if (!isNameValid) {
      dispatch(setErrors({ nameError: "Invalid Name" }));
    } else {
      dispatch(setErrors({ nameError: "" }));
      
    }
  }

  function handleEmail(e) {
    let inputValue = e.target.value;
    isMailValid = emailValidate(inputValue);
    dispatch(setFormValues({ email: inputValue }));
    if (!inputValue) {
      dispatch(setErrors({ emailError: "" }));
    } else if (!isMailValid) {
      dispatch(setErrors({ emailError: "Invalid Email" }));
    } else {
      dispatch(setErrors({ emailError: "" }));
      
    }
  }

  function handlePassword(e) {
    let inputValue = e.target.value;
    isPasswordValid = passwordValidate(inputValue);
    dispatch(setFormValues({ password: inputValue }));
    if (!inputValue) {
      dispatch(setErrors({ passwordError: "" }));
    } else if (!isPasswordValid) {
      dispatch(
        setErrors({
          passwordError:
            "Password should contain atleast one uppercase,lowercase or special chars and of 8 length",
        })
      );
    } else {
      dispatch(setErrors({ passwordError: "" }));
      
    }
  }

  function handleConfirmPassword(e) {
    let inputValue = e.target.value;
    isPasswordMatch = formValues.password === inputValue;
    dispatch(setFormValues({ confirmPassword: inputValue }));
    if (!inputValue) {
      dispatch(setErrors({ passwordMatch: "" }));
    } else if (!isPasswordMatch) {
      dispatch(setErrors({ passwordMatch: "Password does not match" }));
    } else {
      dispatch(setErrors({ passwordMatch: "" }));
      
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
      console.log(res);
      if (res.message === "User already exists") {
        dispatch(setErrors({ userError: "User already exist" }));
        setUserSnack({
          open: true,
          message: "Mobile number already registered",
          severity: "error",
        });
      } else {
        setUserSnack({
          open: true,
          message: "User Created Successfully",
          severity: "success",
        });

        dispatch(setErrors({}));
      }
    }

    dispatch(resetForm());
    dispatch(setErrors({}));
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
          value={formValues.mobileNumber}
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
          value={formValues.name || ""}
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
          value={formValues.email}
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
          value={formValues.password}
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
          value={formValues.confirmPassword}
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
      <Snackbar
        open={userSnack.open}
        autoHideDuration={2000}
        onClose={() => setUserSnack((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        sx={{
          top: "1px",
        }}
      >
        <Alert
          onClose={() => setUserSnack((prev) => ({ ...prev, open: false }))}
          severity={userSnack.severity}
          variant="filled"
        >
          {userSnack.message}
        </Alert>
      </Snackbar>
    </form>
  );
};
