import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../features/categorySlice'
import searchReducer from '../features/searchBarSlice'

export const store = configureStore({
    reducer : {
        category : categoryReducer,
        search : searchReducer
    }
})