import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allHotels: [],
    selectedCategory: "National Parks",
    categories : [],
    filteredHotels : [],
    searchedFilterHotels : [],
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
        },
        setFilteredHotels : (state,action)=>{
            state.filteredHotels = action.payload;
        },
        setSearchedFilterHotels : (state,action)=>{
            state.searchedFilterHotels = action.payload
        }
    }
})

export const {addHotels,onSelectCategory,setCategories,setSingleHotel,showFilterModal,setFilteredHotels,setSearchedFilterHotels} = HotelDataSlice.actions;
export default HotelDataSlice.reducer;