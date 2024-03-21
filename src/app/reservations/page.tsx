'use client'
import LocationDateReserve from "@/components/LocationDateReserve"; 
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { BookingItem } from "../../../interfaces";
import { addBooking } from "@/redux/features/bookSlice";

export default function Reservations () {

    const urlParams = useSearchParams()
    const mid = urlParams.get('id')
    const name = urlParams.get('name')

    const dispatch = useDispatch<AppDispatch>()

    const makeReservation = () => {
        if(mid && name && pickupDate && returnDate) {
            const item:BookingItem = {
                id: mid,
                massageName: name,
                numOfDays: returnDate.diff(pickupDate, 'day'),
                pickupDate: dayjs(pickupDate).format("YYYY/MM/DD"),
                pickupLocation: pickupLocation,
                returnDate: dayjs(returnDate).format("YYYY/MM/DD"),
                returnLocation: returnLocation
            }
            dispatch(addBooking(item))
        }
    }

    const [pickupDate, setPickupDate] = useState<Dayjs | null>(null)
    const [pickupLocation, setPickupLocation] = useState<string>('BKK')
    const [returnDate, setReturnDate] = useState<Dayjs | null>(null)
    const [returnLocation, setReturnLocation] = useState<string>('BKK')

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4"> 
            <div className="text-xl font-medium">New Appointment</div>
            <div className="text-xl font-medium"> Massage {name} </div>
            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">Pick-Up Date and Location</div>
                <LocationDateReserve onDateChange={(value:Dayjs) => {setPickupDate(value)}}
                onLocationChange={(value:string) => setPickupLocation(value)}/>
                <div className="text-md text-left text-gray-600"> Return Date and Location</div>
                <LocationDateReserve onDateChange={(value:Dayjs) => {setReturnDate(value)}}
                onLocationChange={(value:string) => setReturnLocation(value)}/>
            </div>
            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
            onClick={makeReservation}>
                Make an Appointment
            </button>            
        </main>
    );
}

