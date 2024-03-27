'use client'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editBooking } from '@/redux/features/bookSlice';
import { BookingItem } from '../../../../interfaces';
import { useRouter } from 'next/navigation';
import { DatePicker } from '@mui/x-date-pickers';
import "react-datepicker/dist/react-datepicker.css";
import { Session } from 'inspector';
import { useSession } from 'next-auth/react';
import LocationDateReserve from '@/components/LocationDateReserve';
import { Dayjs } from 'dayjs';

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
  const [apptDateState, setApptDateState] = useState<Dayjs>();
  const { data: session } = useSession();

  useEffect(() => {
    fetch(`http://localhost:5001/api/v1/appointments/${params.bookingId}`, {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        authorization : `Bearer ${session?.user.token}`
      }
    })
    .then(res => {
      console.log("heyyyyyyyyyyy")
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })

    .then(data => {
      console.log("eieieieiei",data)

      setBooking(data.data)
      setUserState(data.data.user ?? "")
    })
    .catch(error => {
      console.error("Fetch error: " + error.message);
    });
    }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('apptDateState', apptDateState)
    event.preventDefault();

    await fetch(`http://localhost:5001/api/v1/appointments/${params.bookingId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${session?.user.token}`
      },
      body: JSON.stringify({
          apptDate: apptDateState 
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
    <main className='flex justify-center items-center py-10'>
    <div className='w-[100%] flex flex-col items-center py-10'>
      <form onSubmit={handleSubmit}>
        <div className='font-serif text-lg font-semibold p-3'>Change Booking Date</div>
        {/* {/* <div>{booking._id}</div>
        <div>{booking.apptDate}</div>
        <div>{booking.user}</div>
        <div>{booking.massage}</div> 
        <input type="text" value={userState} onChange={(e)=>{setUserState(e.target.value)}} /> */}
        <LocationDateReserve onDateChange={(value:Dayjs) => {setApptDateState(value)}} />
        <button type="submit" className='m-5 text-black bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-200 bg-opacity-90 transition-colors ease-in-out font-serif  py-2 px-8 rounded-3xl  hover:bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-300 bg-opacity-90 transition-colors duration-300 ease-in-out'>Save Changes</button>
      </form>
    </div>
    </main>
  );
};

export default EditReservationPage;
