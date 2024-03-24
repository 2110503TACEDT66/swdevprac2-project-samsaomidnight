'use client'
import LocationDateReserve from "@/components/LocationDateReserve"; 
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interfaces";
import { addBooking } from "@/redux/features/bookSlice"; 
import { TextField } from "@mui/material";

export default function Reservations () {

    const urlParams = useSearchParams()
    const mid = urlParams.get('id')
    const name = urlParams.get('name')

    const dispatch = useDispatch<AppDispatch>()

    const makeBooking = () => {
        if(userName && reserveDate && name) {
            const item:BookingItem = {
                userName: userName,
                massage: name,
                reserveDate: dayjs(reserveDate).format("YYYY/MM/DD")
            }
            dispatch(addBooking(item))
        }
    }

    const [userName, setUserName] = useState<string | null>(null)
    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)


    return (
        <main className="w-[100%] flex flex-col items-center space-y-4"> 
            <div className="text-xl font-medium">New Reservation</div>
            <div className="text-xl font-medium text-cyan-300"> Massage Shop: {name} </div>
            <div className="w-fit space-y-2  text-cyan-300">
              <TextField name="name" label="name" variant="outlined" onChange={(e) => setUserName(e.target.value) } />
              <div className="text-md text-left text-gray-600">Reserve Date</div>
              <LocationDateReserve onDateChange={(value:Dayjs) => {setReserveDate(value)}} />
            </div>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
            onClick={makeBooking}>
                Reserve this Massage Shop
            </button>            
        </main>
    );
}