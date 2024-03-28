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
  // const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
  const [bookItems, setBookItems] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [refetch, setRefetch] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.token) {
        const fetchedProfile = await getUserProfile(session.user.token);
        console.log("fucking profiel", fetchedProfile);
        setProfile(fetchedProfile);
      }
    };
    fetchData();
  }, [session?.user?.token]); // Dependency on session token


  useEffect(() => {
    setRefetch(false)
    const allshit = async () => {
      if (session?.user?.token) {
        const fetchedProfile = await getUserProfile(session.user.token);
        const shit = await fetch("/api/appointments").then(async response => {
          // const json_shit = await shit.json();
          // console.log("got this", json_shit);
          if (response.ok) {
            return await response.json()
          } else {
            return []
          }
        })
        console.log("a lot of:", shit, typeof(shit), shit.length)
        setBookItems(shit.data);
      }

    }
    if (refetch) {
      allshit();
    }
  }, [session?.user?.token, refetch])


  const renderBookingItems = () => {
    // Filter bookings based on user role and name
    console.log("All bookking, and user data:",
      profile
    )
    const filteredBookItems =
      profile?.data?.role !== "admin"
        ? bookItems?.filter((item: any) => item.user === profile?.data._id)
        : bookItems;
    console.log("filteredBookItems", filteredBookItems);
    return filteredBookItems?.length === 0 ? (
      <div className="font-serif">No Massage Shop Appointment</div>
    ) : (
      filteredBookItems?.map((bookingItem: BookingItem) => (
        <div
          className="bg-slate-100 rounded px-5 mx-5 py-2 my-2"
          key={bookingItem.id}
        >
          <div className="text-md font-serif">Name: {profile?.data?.role !== "admin" ? profile?.data.name : bookingItem.user}</div>
          <div className="text-md font-serif">
            Massage shop: {bookingItem.massage}
          </div>
          <div className="text-md font-serif">
            Reservation Date: {bookingItem.apptDate}
          </div>
          <button
            className="m-5 text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-200 bg-opacity-90 transition-colors ease-in-out font-serif  py-2 px-8 rounded-3xl  hover:bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 bg-opacity-90 transition-colors duration-300 ease-in-out"
            onClick={async () => {
              // dispatch(removeBooking(bookingItem.mongoid));
              console.log("shit is fucking:", 
                bookingItem,
              )
              const chad = await fetch(`/api/appointments`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  "Book-Id": bookingItem._id,
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  return data
              });
              // reload
              setRefetch(true);
            }}

          >
            Remove Booking
          </button>
          <button className="m-5 text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-200 bg-opacity-90 transition-colors ease-in-out font-serif  py-2 px-8 rounded-3xl  hover:bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 bg-opacity-90 transition-colors duration-300 ease-in-out">
            <Link href={`/edit-reservation/${bookingItem._id}`}>
              <div>
                Edit booking
              </div>
            </Link>
          </button>
        </div>
      ))
    );
  };

  return (
    <>
      <div className="text-xl px-5 py-3 font-serif mt-5 text-center">
        {" "}
        <strong>Booking Information</strong>
      </div>
      {profile ? renderBookingItems() : <div>Loading profile...</div>}
    </>
  );
}
