'use client'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { editBooking } from '@/redux/features/bookSlice';
import LocationDateReserve from '@/components/LocationDateReserve';
import dayjs, { Dayjs } from 'dayjs'; // Import dayjs if you're using it for date manipulation


const EditReservationPage = () => {
    const [booking, setBooking] = useState(null);
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const router = useRouter();
  
    useEffect(() => {
      if (router.isReady) {
        console.log("router is ready")
        const bookingId = router.query.bookingId; // Now it's safe to access bookingId
        if (typeof bookingId === 'string') {
          console.log('fetching')
          fetch(`http://localhost:5001/api/v1/appointments/${bookingId}`)
            .then(response => {
              if (!response.ok) throw new Error(response.statusText);
              return response.json();
            })
            .then(data => {
              setBooking({
                ...data,
                reserveDate: dayjs(data.reserveDate),
              });
              console.log("done fetching")
            })
            .catch(() => router.push('/404'));
        }
      }
    }, [router.isReady, router.query]);
  
   
  const handleDateChange = (value: Dayjs) => {
    setBooking({ ...booking, reserveDate: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would have your API call or Redux action to update the booking
    if (booking) {
      dispatch(editBooking(booking));
      router.push('/cart'); 
    }
  };

  if (!booking) {
    return <p>Loading...</p>;
  }

  return (
    <main className="w-full flex flex-col items-center space-y-4"> 
      <div className="text-xl font-medium">Edit Reservation</div>
      <div className="text-xl font-medium text-cyan-300"> Massage Shop: {booking.name} </div>
      <div className="w-fit space-y-2 text-cyan-300">
        <div className="text-md text-left text-gray-600">Reserve Date</div>
        <LocationDateReserve onDateChange={handleDateChange} />
      </div>
      <button
        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 shadow-sm text-white"
        onClick={handleSubmit}
      >
        Save Changes
      </button>            
    </main>
  );
};

export default EditReservationPage;
