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
        <div className="bg-slate-100 rounded px-5 mx-5 py-2 my-2" key={bookingItem.id}>
          <div className="text-md font-serif">Name: {bookingItem.userName}</div>
          <div className="text-md font-serif">Massage shop: {bookingItem.massage}</div>
          <div className="text-md font-serif">Reservation Date: {bookingItem.reserveDate}</div>
          <button
            className="m-5 text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-200 bg-opacity-90 transition-colors ease-in-out font-serif  py-2 px-8 rounded-3xl  hover:bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 bg-opacity-90 transition-colors duration-300 ease-in-out"
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
          <button className="m-5 text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-200 bg-opacity-90 transition-colors ease-in-out font-serif  py-2 px-8 rounded-3xl  hover:bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 bg-opacity-90 transition-colors duration-300 ease-in-out">
          <Link href={`/edit-reservation/${bookingItem.id}`}>
            Edit booking
          </Link>
          </button>
        </div>
      ))
    );
  };

  return (
    <>
      <div className="text-xl px-5 py-3 font-serif mt-5 text-center"> <strong>Booking Information</strong></div>
      {profile ? renderBookingItems() : <div>Loading profile...</div>}
    </>
  );
}