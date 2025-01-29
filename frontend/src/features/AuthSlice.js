import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authModal : false,
    login : true,
    signUp : false
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
        }
    }
});

export const {showLogin,showSignUp,showAuthModal} = AuthSlice.actions;
export default AuthSlice.reducer;