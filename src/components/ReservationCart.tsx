'use client'
import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { removeBooking , editBooking} from "@/redux/features/bookSlice"
import {bookSlice} from "@/redux/features/bookSlice"
import { BookingItem } from "../../interfaces"

export default function BookingList() {
    const { bookItems, currentUserRole, currentUserId } = useAppSelector((state) => ({
      bookItems: state.bookSlice.bookItems,
      currentUserRole: state.bookSlice.currentUserRole,
      currentUserId: state.bookSlice.currentUserId,
    }));
  
    const dispatch = useDispatch<AppDispatch>();
  
    // Filter bookings based on the role
    const filteredBookings = currentUserRole === 'admin' ? bookItems : bookItems.filter((booking:BookingItem) => booking.userId === currentUserId);
  
    return (
      <>
        <div className="text-xl px-5 py-3">Booking Information</div>
        {filteredBookings.length === 0 ? (
          <div>No Massage Shop Appointment</div>
        ) : (
          filteredBookings.map((bookingItem:BookingItem) => (
            <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookingItem.id}>
              <div className="text-md">User Name: {bookingItem.userName}</div>
              <div className="text-md">Massage shop: {bookingItem.massage}</div>
              <div className="text-md">Reservation Date: {bookingItem.reserveDate}</div>
  
              <button
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
                onClick={() => dispatch(removeBooking(bookingItem.id))}
              >
                Remove Booking
              </button>

              <button
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
                onClick={() => dispatch(editBooking(bookingItem.id))}
              >
                Edit Booking
              </button>
            </div>
          ))
        )}
      </>
    );
  }