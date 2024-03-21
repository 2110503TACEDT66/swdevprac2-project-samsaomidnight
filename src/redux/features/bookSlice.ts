import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookState, MassageShop, BookingItem } from "../../../interfaces";

const initialState: BookState = {
  bookItems: [],
  massageShops: [], // Assuming this would be fetched from the backend or statically defined
  maxReservationsPerUser: 3,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setMassageShops: (state, action: PayloadAction<MassageShop[]>) => {
      state.massageShops = action.payload;
    },
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const userReservations = state.bookItems.filter(booking => booking.userId === action.payload.userId);
      if (userReservations.length < state.maxReservationsPerUser) {
        state.bookItems.push(action.payload);
      } else {
        // Handle the case where the user already has the maximum number of reservations
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
