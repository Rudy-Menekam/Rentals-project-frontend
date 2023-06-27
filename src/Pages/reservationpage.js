/* eslint-disable */
import React from 'react';
import BookingForm from '../components/BookingForm/BookingForm';
import SmallSidebar from '../components/SmallSidebar/SmallSidebar';
import BigSidebar from '../components/BigSidebar/BigSidebar';

// eslint-disable-next-line no-unused-vars
const Reservationpage = (props) => (
  <div className="sliderwrapper">
    <SmallSidebar />
    <BigSidebar />
    <BookingForm />
  </div>
);

export default Reservationpage;
