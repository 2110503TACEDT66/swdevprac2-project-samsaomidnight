'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { BookingItem, MassageItem } from '../../../interfaces';
import { addBooking } from '@/redux/features/bookSlice';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useSearchParams } from 'next/navigation';

export default function Reservations() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);
  const [massageShop, setMassageShop] = useState('');
  const [massageShops, setMassageShops] = useState<MassageItem[]>([]); // This should be fetched from the backend

  const dispatch = useDispatch<AppDispatch>();
  const urlParams = useSearchParams();
  const userId = 'user-id'; // This should be dynamically obtained from your user authentication system

  // Simulate fetching massage shops from a backend
  useEffect(() => {
    // fetchMassageShops().then(data => setMassageShops(data));
    // Placeholder data
    setMassageShops([
      { _id: 'shop1', name: 'Relaxation Haven', picture: '', address: '', open_close_times: [] },
      { _id: 'shop2', name: 'Serenity Now', picture: '', address: '', open_close_times: [] },
    ]);
  }, []);

  const makeReservation = () => {
    if (firstName && lastName && appointmentDate && massageShop) {
      const bookingItem: BookingItem = {
        id: 'unique-booking-id', // This ID should be generated or obtained appropriately
        massage: `${firstName} ${lastName}`, // Assuming you want to store the name in the massage field
        userId: userId,
        shopId: massageShop,
        date: appointmentDate.format('YYYY-MM-DDTHH:mm:ssZ'),
      };
      dispatch(addBooking(bookingItem));
    }
  };

  return (
    <main className="w-full flex flex-col items-center space-y-4">
      <div className="text-xl font-medium">New Massage Appointment</div>
      <TextField label="First Name" variant="outlined" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full max-w-xs" />
      <TextField label="Last Name" variant="outlined" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full max-w-xs" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Appointment Date/Time"
          value={appointmentDate}
          onChange={setAppointmentDate}
        />
      </LocalizationProvider>
      <FormControl fullWidth>
        <InputLabel id="massage-shop-label">Massage Shop</InputLabel>
        <Select
          labelId="massage-shop-label"
          id="massage-shop"
          value={massageShop}
          label="Massage Shop"
          onChange={(e) => setMassageShop(e.target.value)}
        >
          {massageShops.map((shop) => (
            <MenuItem key={shop._id} value={shop._id}>{shop.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={makeReservation}>
        Make an Appointment
      </Button>
    </main>
  );
}