import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCategory : ""
}

const categorySlice = createSlice({
    name : 'category',
    initialState : initialState,
    reducers : {
        onSelectCategory : (state,action)=>{
            state.selectedCategory = action.payload;
        }

    }
})

/* export const { onSelectCategory } = categorySlice.actions;
export default categorySlice.reducer; */