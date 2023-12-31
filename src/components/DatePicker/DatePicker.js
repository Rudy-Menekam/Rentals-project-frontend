import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateRange = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <div className="select-container">
      <div>
        <p>Start Date</p>
        <DatePicker
          selectsStart
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          startDate={startDate}
        />
      </div>
      <div>
        <p>End Date</p>
        <DatePicker
          selectsEnd
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          endDate={endDate}
          startDate={startDate}
          minDate={startDate}
        />
      </div>

    </div>
  );
};

export default DateRange;
