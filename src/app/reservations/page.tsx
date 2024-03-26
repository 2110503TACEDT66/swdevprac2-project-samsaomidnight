'use client'

import LocationDateReserve from "@/components/LocationDateReserve"; 
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interfaces";
import { addBooking } from "@/redux/features/bookSlice"; 
import { TextField } from "@mui/material";
import getUserProfile from "@/libs/getUserProfile";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { POST } from "../api/appointments/route";

export default function Reservations () {

    const urlParams = useSearchParams()
    const mid = urlParams.get('id')
    const name = urlParams.get('name')
    const { data: session } = useSession();
    const [profile, setProfile] = useState<{ data?: { name?: string } }>({ data: {} });

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
    const dispatch = useDispatch<AppDispatch>()

    const makeBooking = async () => {
      if (session?.user.token) {
          const user = await getUserProfile(session.user.token);
          setProfile(user)
          if(reserveDate && name) {
              const item:BookingItem = {
                  userName: profile.data.name,
                  massage: name,
                  reserveDate: dayjs(reserveDate).format("YYYY-MM-DD")
              }
              await fetch(`/api/appointments`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  user: profile.data._id,
                  massage: mid,
                  apptDate: item.reserveDate
                })
              })
              dispatch(addBooking(item))
              // console.log(item)
          }
        }
        
    }

    const [userName, setUserName] = useState<string | null>(null)
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)


    return (
        <main className="w-full flex flex-col items-center space-y-4"> 
          <div className="font-serif text-2xl text-white">{session?.user.name}</div>
            <div className="font-serif text-2xl font-medium"><strong>New Reservation</strong></div>
            <div className="text-2xl font-medium font-serif text-yellow-600"> Massage Shop: {name} </div>
            <div className="w-fit space-y-2 font-serif">
              {/* <TextField name="name" label="name" variant="outlined" onChange={(e) => setUserName(e.target.value) } /> */}
              <div className="text-lg text-left font-serif text-gray-600">Reserve Date</div>
              <LocationDateReserve onDateChange={(value:Dayjs) => {setReserveDate(value)}} />
            </div>
            <button className="text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-200 bg-opacity-90 transition-colors ease-in-out font-serif  py-2 px-8 rounded-3xl  hover:bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 bg-opacity-90 transition-colors duration-300 ease-in-out">
                Reserve this Massage Shop
            </button>            
        </main>
    );
}
