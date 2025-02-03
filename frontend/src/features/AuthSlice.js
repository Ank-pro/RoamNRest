import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authModal: false,
    login: true,
    signUp: false,
    formValues: {
        mobileNumber: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    },
    openSnackBar: {
        type: '',
        status: false,
    },
    errors: {},
    user: {
        name: '',
        token: ''
    }
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        showLogin: (state, action) => {
            state.login = action.payload;
        },
        showSignUp: (state, action) => {
            state.signUp = action.payload;
        },
        showAuthModal: (state, action) => {
            state.authModal = action.payload;
        },
        setFormValues: (state, action) => {
            state.formValues = { ...state.formValues, ...action.payload }
        },
        setErrors: (state, action) => {
            state.errors = { ...state.errors, ...action.payload };
        },
        setOpenSnackBar: (state, action) => {
            const { type, status } = action.payload
            state.openSnackBar = { type, status };
        },
        setUser: (state, action) => {
            const { name, token } = action.payload;
            state.user = { name, token };
        },
        resetAuth: (state) => {
            state.authModal = false
            state.formValues = {
                mobileNumber: "",
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
            state.errors = {};
            state.user = {
                name: '',
                token: ''
            }
        }
    }
});

export const { showLogin, showSignUp, showAuthModal, setFormValues, setUser, setOpenSnackBar, setErrors, resetAuth } = AuthSlice.actions;
export default AuthSlice.reducer;