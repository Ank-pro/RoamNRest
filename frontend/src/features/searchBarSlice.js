import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkInDate: null,
    checkOutDate: null,
    guest: {
        adults: 1,
        childrens: 0,
        pets: 0
    },
    guestModal : false,
    destination: "",
    destinationModal : false
}

const searchBarSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDates: (state, action) => {
            const { checkin, checkout } = action.payload;
            state.checkInDate = checkin ? checkin.toISOString() : null;
            state.checkOutDate = checkout ? checkout.toISOString() : null;
        },
        setGuest: (state, action) => {
            state.guest = { ...action.payload };
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        }

    }
})

export const { setDates, setDestination, setGuest } = searchBarSlice.actions;
export default searchBarSlice.reducer;