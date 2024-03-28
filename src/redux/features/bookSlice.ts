import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BookState, MassageItem, BookingItem } from "../../../interfaces";
import { v4 as uuidv4 } from 'uuid';

const initialState: BookState = {
  bookItems: [],
  massageShops: [], // Assuming this would be fetched from the backend or statically defined
  maxReservationsPerUser: 3,
  currentUserRole: "user",
  currentUserId: ""
};

export const bookSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setMassageShops: (state, action: PayloadAction<MassageItem[]>) => {
      state.massageShops = action.payload;
    },
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const userReservations = state.bookItems.filter(booking => booking.userName === action.payload.userName);
      const newBooking = {
        ...action.payload,
        id: uuidv4(), // Ensure a unique ID is assigned
      };
      state.bookItems.push(newBooking);
    //   if (userReservations.length < state.maxReservationsPerUser) {
    //     // Assign a unique ID to each new booking
    //     const newBooking = {
    //       ...action.payload,
    //       id: uuidv4(), // Ensure a unique ID is assigned
    //     };
    //     state.bookItems.push(newBooking);
        
    // // Log the total number of reservations for the user, including the new booking
    // console.log(`Total reservations for user ${action.payload.userName}: ${userReservations.length + 1}`);
    //   } else {
    //     alert("User has reached the maximum number of reservations.");
    //     console.warn("User has reached the maximum number of reservations.");
    //   }
    },

    removeBooking: (state, action: PayloadAction<string>) => {
      state.bookItems = state.bookItems.filter(booking => booking.id !== action.payload);
    },
    
    editBooking: (state, action: PayloadAction<BookingItem>) => {
      const index = state.bookItems.findIndex(booking => booking.id === action.payload.id);
      if (index !== -1) {
        state.bookItems[index] = { ...state.bookItems[index], ...action.payload };
        // Log the update
        console.log(`Booking updated: ${action.payload.id}`);
      } else {
        console.warn("Booking not found.");
      }
    },
    
    
  },
});

export const { setMassageShops, addBooking, removeBooking, editBooking } = bookSlice.actions;
export default bookSlice.reducer;