'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBooking } from '@/redux/features/bookSlice';
import LocationDateReserve from "@/components/LocationDateReserve";
import getUserProfile from '@/libs/getUserProfile';
import userLogIn from '@/libs/userLogIn';
import dayjs from 'dayjs';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function Reservations() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState<dayjs.Dayjs | null>(null);
  const [massageShop, setMassageShop] = useState('');
  const [massageShops, setMassageShops] = useState([]); // Replace with your massage shops state
  const [userToken, setUserToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (email: string, password: string) => {
    try {
      const data = await userLogIn(email, password);
      setUserToken(data.token); // Assuming the token is returned here
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed", error);
      // Handle login failure
    }
  };

  const getCurrentUserId = async () => {
    try {
      const userProfile = await getUserProfile(userToken);
      return userProfile.data._id; // Adjust depending on the shape of the response
    } catch (error) {
      console.error("Failed to fetch user profile", error);
      // Handle error appropriately
    }
  };

  const makeReservation = async () => {
    const userId = await getCurrentUserId();
    if (!userId || !appointmentDate || !massageShop) {
      console.error('Missing user ID, appointment date, or massage shop ID.');
      return;
    }

    const appointmentData = {
      apptDate: appointmentDate.toISOString(),
      user: userId,
      massage: massageShop,
    };

    try {
      const response = await fetch('http://localhost:5001/api/v1/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }

      const data = await response.json();
      dispatch(addBooking(data));
      console.log('Appointment created:', data);
    } catch (error) {
      console.error('Failed to create appointment:', error);
    }
  };

  return (
    <main className="w-full flex flex-col items-center space-y-4 ">
      <div className="text-xl font-medium">New Massage Appointment</div>
      
      
        <>
          <TextField 
            label="First Name" 
            variant="outlined" 
            value={firstName} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)} 
            className="w-full max-w-xs" 
          />
          <TextField 
            label="Last Name" 
            variant="outlined" 
            value={lastName} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)} 
            className="w-full max-w-xs" 
          />
          {/* <LocationDateReserve
            onDateChange={(newValue: dayjs.Dayjs | null) => setAppointmentDate(newValue)}
            onLocationChange={(newValue: string) => setLocation(newValue)}
          /> */}
          <FormControl fullWidth>
            <InputLabel id="massage-shop-label">Massage Shop</InputLabel>
            <Select
              labelId="massage-shop-label"
              id="massage-shop-select"
              value={massageShop}
              label="Massage Shop"
              onChange={(e) => setMassageShop(e.target.value)}
            >
              {massageShops.map((shop: any) => ( // Make sure to replace `any` with your massage shop type
                <MenuItem key={shop._id} value={shop._id}>{shop.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={makeReservation}>
            Make an Appointment
          </Button>
        </>
      
    </main>
  );
}
