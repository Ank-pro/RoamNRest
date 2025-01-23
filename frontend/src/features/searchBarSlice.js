import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    checkInDate: new Date(),
    checkOutDate: null,
    guest: {
        adults: 1,
        childrens: 0,
        pets: 0
    },
    guestModal: false,
    searchModal: false,
    destination: null,
    destinationModal: false
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