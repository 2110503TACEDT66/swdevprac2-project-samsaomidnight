import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookSlice from "./features/bookSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { BookingItem } from "../../interfaces";

const persistConfig = {
    key: "rootPersist",
    storage
}

const rootReducer = combineReducers({bookSlice})
const reduxPersistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: reduxPersistedReducer
})

export const selectUserBookings = (state: any, userId: string) => {
    if (state.cart.userRole === 'admin') {
      return state.cart.bookItems; // Admin can see all bookings
    } else {
      return state.cart.bookItems.filter((booking:BookingItem) => booking.userId === userId); // Users see only their bookings
    }
  };

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector