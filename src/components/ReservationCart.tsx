import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { editBooking, removeBooking } from "@/redux/features/bookSlice";
import getUserProfile from "@/libs/getUserProfile";
import { BookingItem } from "../../interfaces";
import Link from "next/link";
export default function BookingList() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
  const [profile, setProfile] = useState(null);

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
      bookItems.filter((item:any) => item.userName === profile.data.name) :
      bookItems;
    console.log(filteredBookItems);
    return filteredBookItems.length === 0 ? (
      <div>No Massage Shop Appointment</div>
    ) : (
      filteredBookItems.map((bookingItem: BookingItem) => (
        <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={bookingItem.id}>
          <div className="text-md">Name: {bookingItem.userName}</div>
          <div className="text-md">Massage shop: {bookingItem.massage}</div>
          <div className="text-md">Reservation Date: {bookingItem.reserveDate}</div>
          <button
            className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
            onClick={async () => {
              dispatch(removeBooking(bookingItem.id));
              await fetch(`/api/appointments/${bookingItem.id}`,{method:"DELETE"})
              .then(res=>res.json())
              .then((data)=>{
                console.log(data)
              })
            }}
          >
            Remove Booking
          </button>
          <Link href={`/edit-reservation/${bookingItem.id}`} 
                className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white">
              Edit booking
            
          </Link>
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