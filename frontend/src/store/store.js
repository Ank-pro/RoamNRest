import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../features/HotelDataSlice'
import searchReducer from '../features/searchBarSlice'

export const store = configureStore({
    reducer : {
        home : homeReducer,
        search : searchReducer
    }
})