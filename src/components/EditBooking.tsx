import React from 'react';
import { useParams } from 'react-router-dom';

export default function EditBooking() {
  let { bookingId } = useParams(); // Get the bookingId from URL

  // Logic to fetch the booking details using bookingId, and then display them in a form for editing

  return (
    <div>
      <h2>Edit Booking - {bookingId}</h2>
      {/* Your form for editing the booking */}
        
    </div>
  );
}