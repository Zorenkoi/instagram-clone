import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelector({ date, setDate }) {
  return (
    <DatePicker
      selected={date}
      onChange={(date) => setDate(date)}
      dateFormat="dd/MM/yyyy"
    />
  );
}

export default DateSelector;
