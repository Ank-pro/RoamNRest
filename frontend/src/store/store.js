import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../features/HotelDataSlice'
import searchReducer from '../features/searchBarSlice'
import authReducer from '../features/AuthSlice'

export const store = configureStore({
    reducer : {
        home : homeReducer,
        search : searchReducer,
        auth : authReducer,
    }
})