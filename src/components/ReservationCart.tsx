'use client'
import { useAppSelector, AppDispatch } from "@/redux/store"
import { useDispatch } from "react-redux"
import { removeBooking } from "@/redux/features/bookSlice"
import {bookSlice} from "@/redux/features/bookSlice"

export default function BookingList() {

    const bookItems = useAppSelector((state) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <>
        <div className="text-xl px-5 py-3">Booking Informations</div>
            {bookItems.length === 0 ? (
                <div>No Massage Shop Appointment</div>
            ) : (
                bookItems.map((bookingItem)=>(
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookingItem.id}>
                        <div className="text-md">Book Date: {bookingItem.bookDate}</div>
                        <div className="text-md">id: {bookingItem.id}</div>
                        <div className="text-md">Massage Shop: {bookingItem.massage}</div>
                    
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
                        onClick={()=>dispatch(removeBooking(bookingItem.id))}>
                            Remove Booking
                        </button> 
                        
                    </div>
                ))
            )}
        </>
    )
}
