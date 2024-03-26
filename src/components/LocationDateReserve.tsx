'use client'
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Select, MenuItem } from "@mui/material"
import { useState } from "react"
import { Dayjs } from "dayjs"

export default function LocationDateReserve({onDateChange} :{onDateChange:Function}) {

    const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)

    return (
        <div className=" bg-gradient-to-r from-slate-400 via-slate-150 to-slate-200 bg-opacity-90
        rounded-sm space-x-5 space-y-2 w-fit px-2 py-2 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white"
                value={reserveDate}
                onChange={(value)=>{setReserveDate(value); onDateChange(value)}}/>
            </LocalizationProvider>
        </div>
    )
}