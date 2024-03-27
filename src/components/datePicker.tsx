'use client'
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

const DayjsDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Controlled picker"
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
      />
    </LocalizationProvider>
  );
};

export default DayjsDatePicker;
