import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookState, MassageItem, BookingItem } from "../../../interfaces";
import { v4 as uuidv4 } from 'uuid';

const initialState: BookState = {
  bookItems: [],
  massageShops: [], // Assuming this would be fetched from the backend or statically defined
  maxReservationsPerUser: 3,
};

export const bookSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setMassageShops: (state, action: PayloadAction<MassageItem[]>) => {
      state.massageShops = action.payload;
    },
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const userReservations = state.bookItems.filter(booking => booking.userId === action.payload.userId);
    
      if (userReservations.length < state.maxReservationsPerUser) {
        // Assign a unique ID to each new booking
        const newBooking = {
          ...action.payload,
          id: uuidv4(), // Generate a unique ID for the booking
        };
        state.bookItems.push(newBooking);
      } else {
        alert('"User has reached the maximum number of reservations."')
        console.warn("User has reached the maximum number of reservations.");
      }
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      state.bookItems = state.bookItems.filter(booking => booking.id !== action.payload);
    },
  },
});

export const { setMassageShops, addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
