import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { editBooking, removeBooking } from "@/redux/features/bookSlice";
import getUserProfile from "@/libs/getUserProfile";
import { BookingItem } from "../../interfaces";
import { useRouter } from "next/router";

export default function BookingList() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
  const [profile, setProfile] = useState(null);
  

  const MyComponent = () => {
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
      // Set isMounted to true when the component mounts
      setIsMounted(true);
    }, []);
  
    // Conditionally use useRouter only after the component has mounted
    const router = isMounted ? useRouter() : null;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.token) {
        const fetchedProfile = await getUserProfile(session.user.token);
        console.log(fetchedProfile);
        setProfile(fetchedProfile);
      }
    };
    fetchData();
  }, [session?.user?.token]); // Dependency on session token

  const renderBookingItems = () => {
    // Filter bookings based on user role and name
    const filteredBookItems = profile?.data?.role !== "admin" ?
      bookItems.filter((item) => item.userName === profile.data.name) :
      bookItems;
    console.log(filteredBookItems);
    return filteredBookItems.length === 0 ? (
      <div>No Massage Shop Appointment</div>
    ) : (
      filteredBookItems.map((bookingItem: BookingItem) => (
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
          // Update your Edit Booking button
          <button
            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
            onClick={() => router.push(`/edit-reservation/${bookingItem.id}`)}
          >
            Edit Booking
          </button>

        </div>
      ))
    );
  };

  return (
    <>
      <div className="text-xl px-5 py-3">Booking Information</div>
      {profile ? renderBookingItems() : <div>Loading profile...</div>}
    </>
  );
}