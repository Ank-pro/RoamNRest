import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allHotels: [],
    selectedCategory: "",
    categories : [],
    singleHotel : null,
    filterModal : false,
}

const HotelDataSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
        addHotels: (state, action) => {
            state.allHotels = action.payload;
        },
        onSelectCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setCategories : (state,action)=>{
            state.categories = action.payload;
        },
        setSingleHotel : (state,action)=>{
            state.singleHotel = action.payload;
        },
        showFilterModal : (state,action)=>{
            state.filterModal = action.payload;
        }
    }
})

export const {addHotels,onSelectCategory,setCategories,setSingleHotel,showFilterModal} = HotelDataSlice.actions;
export default HotelDataSlice.reducer;