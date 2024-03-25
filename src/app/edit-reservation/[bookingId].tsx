import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editBooking } from '@/redux/features/bookSlice';
import { BookingItem } from '../../../interfaces';

const EditReservationPage = () => {
  const [booking, setBooking] = useState<BookingItem | null>(null);
  const router = useRouter();
  const { bookingId } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBooking = async () => {
      // Fetch the booking details from your API and set it in state
      // Replace '/api/bookings/' with your actual API endpoint
      const response = await fetch(`/api/bookings/${bookingId}`);
      const data = await response.json();
      setBooking(data);
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Dispatch an action to edit the booking
    // You need to define how your update logic will work and ensure the payload is correct
    dispatch(editBooking(booking));
    // After dispatching, navigate back to the bookings page or show a success message
    router.push('/path-to-redirect-after-edit');
  };

  if (!booking) {
    return <div>Loading booking details...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={booking.massage}
        onChange={(e) => setBooking({ ...booking, massage: e.target.value })}
      />
      {/* Add other form fields for booking details here */}
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditReservationPage;