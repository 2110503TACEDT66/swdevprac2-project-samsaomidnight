import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interfaces";

type BookState = {
    bookItems: BookingItem[];
};

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<BookingItem>) => {
            const existingBookingIndex = state.bookItems.findIndex(booking => booking.id === action.payload.id);
            if (existingBookingIndex !== -1) {
                // If booking with the same id already exists, replace it
                state.bookItems[existingBookingIndex] = action.payload;
            } else {
                // Otherwise, add the new booking
                state.bookItems.push(action.payload);
            }
        },
        removeBooking: (state, action: PayloadAction<string>) => {
            // Filter out the booking with the provided id
            state.bookItems = state.bookItems.filter(booking => booking.id !== action.payload);
        },
    },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
