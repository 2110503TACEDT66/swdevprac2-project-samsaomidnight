'use client'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editBooking } from '@/redux/features/bookSlice';
import { BookingItem } from '../../../../interfaces';
import { useRouter } from 'next/navigation';
import { DatePicker } from '@mui/x-date-pickers';
import "react-datepicker/dist/react-datepicker.css";

interface Booking {
  _id: string,
  apptDate: string,
  user: string,
  massage: string,
}

const EditReservationPage = ({params}:{params:{bookingId:string}}) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const dispatch = useDispatch();
  const bookingId = params.bookingId;
  const router = useRouter();
  const [userState, setUserState] = useState("");
  const [apptDateState, setApptDateState] = useState("");

  useEffect(() => {
    fetch(`/api/appointments`, {
      method: "GET",
      headers: {
        'Booking-Id': bookingId
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      setBooking(data.data)
      setUserState(data.data.user ?? "")
    })
    .catch(error => {
      console.error("Fetch error: " + error.message);
    });
    }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await fetch(`/api/appointments`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: bookingId,
        updateData: {
          user: userState,
          apptDate: apptDateState
        }
      })
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
    })
  };

  if (!booking) {
    return <div>Loading booking details...</div>;
  }

  return (
    <div className='mt-5 bg-white text-black'>
      <form onSubmit={handleSubmit}>
        {/* ... form fields ... */}
        <div>{booking._id}</div>
        <div>{booking.apptDate}</div>
        <div>{booking.user}</div>
        <div>{booking.massage}</div>
        <input type="text" value={userState} onChange={(e)=>{setUserState(e.target.value)}} />
          {/* <DatePicker
          selected={apptDateState ? new Date(apptDateState) : null}
          onChange={(date: Date | null) => setApptDateState(date ? date.toISOString().substring(0, 10) : '')}
          dateFormat="yyyy-MM-dd"
        /> */}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditReservationPage;
