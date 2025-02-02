import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkInDate: null,
    checkOutDate: null,
    guest: {
        adults: 1,
        childrens: 0,
        pets: 0
    },
    guestModal: false,
    searchModal: false,
    destination: "",
    destinationModal: false
}

const searchBarSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        setDates: (state, action) => {
            const { checkin, checkout } = action.payload;
            console.log('Setting dates:', {
                checkinValue: checkin,
                checkoutValue: checkout
            });
            state.checkInDate = checkin ? checkin : null;
            state.checkOutDate = checkout ? checkout : null;
        },
        setGuest: (state, action) => {
            state.guest = { ...action.payload };
        },
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        showDestinationModal: (state, action) => {
            state.destinationModal = action.payload;
        },
        showGuestModal: (state, action) => {
            state.guestModal = action.payload;
        },
        showSearchModal: (state, action) => {
            state.searchModal = action.payload;
        }

    }
})

export const { setDates, setDestination, setGuest, showDestinationModal, showSearchModal, showGuestModal } = searchBarSlice.actions;
export default searchBarSlice.reducer;