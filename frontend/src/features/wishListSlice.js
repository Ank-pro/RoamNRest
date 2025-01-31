import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishListHotels: [],
    isFavourite : false,
}

const WishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishList: (state, action) => {
            state.wishListHotels = [...state.wishListHotels, action.payload]
        },
        removeFromWishList: (state, action) => {
            const hotelToBeRemoved = action.payload;
            state.wishListHotels = state.wishListHotels.filter(hotel => hotel._id !== hotelToBeRemoved._id)
        },
        toggleFavourite : (state,action)=>{
            state.isFavourite = action.payload;
        }
    }
})

export const { addToWishList, removeFromWishList,toggleFavourite } = WishListSlice.actions;
export default WishListSlice.reducer