// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { editBooking } from '@/redux/features/bookSlice';
// import { BookingItem } from '../../../interfaces';

// const EditReservationPage = () => {
//   const [booking, setBooking] = useState<BookingItem | null>(null);
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const { bookingId } = router.query;

//   useEffect(() => {
//     const fetchBooking = async () => {
//       // Assuming you have an API endpoint to fetch a specific booking by ID
//       const response = await fetch(`/api/bookings/${bookingId}`);
//       const data: BookingItem = await response.json();
//       setBooking(data);
//     };

//     if (bookingId) {
//       fetchBooking();
//     }
//   }, [bookingId]);

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (booking) {
//       dispatch(editBooking(booking));
//       // Navigate back or to another page upon success
//       router.push('/path-to-redirect-after-success');
//     }
//   };

//   if (!booking) {
//     return <div>Loading booking details...</div>;
//   }

//   // Render form with booking data allowing to edit and submit changes
//   return (
//     <form onSubmit={handleSubmit}>
//       {/* Form fields for editing the booking, e.g., */}
//       <input
//         type="text"
//         value={booking.massage || ''}
//         onChange={(e) => setBooking({ ...booking, massage: e.target.value })}
//       />
//       {/* Add other necessary fields and a submit button */}
//       <button type="submit">Save Changes</button>
//     </form>
//   );
// };

// export default EditReservationPage;