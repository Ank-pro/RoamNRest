import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../features/HotelDataSlice'
import searchReducer from '../features/searchBarSlice'
import authReducer from '../features/AuthSlice'
import wishListReducer from '../features/wishListSlice'

export const store = configureStore({
    reducer : {
        home : homeReducer,
        search : searchReducer,
        auth : authReducer,
        wishList : wishListReducer
    }
})