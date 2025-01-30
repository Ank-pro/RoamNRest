import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authModal : false,
    login : true,
    signUp : false,
    formValues : {
        mobileNumber : "",
        name : "",
        email : "",
        password : "",
        confirmPassword : ""
    },
    errors : {}
}

const AuthSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        showLogin : (state,action)=>{
            state.login = action.payload;
        },
        showSignUp : (state,action)=>{
            state.signUp = action.payload;
        },
        showAuthModal : (state,action)=>{
            state.authModal = action.payload;
        },
        setFormValues : (state,action)=>{
            state.formValues = {...state.formValues, ...action.payload}
        },
        setErrors : (state,action)=>{
            state.errors = {...state.errors, ...action.payload};
        }
    }
});

export const {showLogin,showSignUp,showAuthModal,setFormValues,setErrors} = AuthSlice.actions;
export default AuthSlice.reducer;