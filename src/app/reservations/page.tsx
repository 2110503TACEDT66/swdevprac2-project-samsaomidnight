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
        <main className="w-[100%] flex flex-col items-center space-y-4"> 
          <div className="text-xl text-white">{session?.user.name}</div>
            <div className="text-xl font-medium">New Reservation</div>
            <div className="text-xl font-medium text-cyan-300"> Massage Shop: {name} </div>
            <div className="w-fit space-y-2  text-cyan-300">
              {/* <TextField name="name" label="name" variant="outlined" onChange={(e) => setUserName(e.target.value) } /> */}
              <div className="text-md text-left text-gray-600">Reserve Date</div>
              <LocationDateReserve onDateChange={(value:Dayjs) => {setReserveDate(value)}} />
            </div>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
            onClick={() => makeBooking()}>
                Reserve this Massage Shop
            </button>            
        </main>
    );
}