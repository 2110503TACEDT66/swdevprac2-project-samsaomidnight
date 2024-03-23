import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";

export default function BookingList() {
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
    const userRole = useAppSelector((state) => state.user.userInfo.role); // Assuming you've added user role to your Redux state
    const dispatch = useDispatch<AppDispatch>();

    const displayBookings = userRole === 'admin' ? bookItems : bookItems.slice(0, 3); // For admin, show all; for others, limit to 3

    return (
        <>
            <div className="text-xl px-5 py-3">Booking Informations</div>
            {displayBookings.length === 0 ? (
                <div>No Massage Shop Appointment</div>
            ) : (
                displayBookings.map((bookingItem) => (
                    <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookingItem.id}>
                        <div className="text-md">User Name: {bookingItem.userName}</div>
                        <div className="text-md">Massage shop: {bookingItem.massage}</div>
                        <div className="text-md">Reservation Date: {bookingItem.reserveDate}</div>
                    
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
                        onClick={() => dispatch(removeBooking(bookingItem.id))}>
                            Remove Booking
                        </button> 
                    </div>
                ))
            )}
        </>
    );
}
