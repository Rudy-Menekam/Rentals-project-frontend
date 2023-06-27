import React from 'react';
import SmallSidebar from '../components/SmallSidebar/SmallSidebar';
import BigSidebar from '../components/BigSidebar/BigSidebar';
import VespaHistory from '../components/VespaHistory/VespaHistory';

// eslint-disable-next-line no-unused-vars
const Reservationshistory = (props) => (
  <div className="sliderwrapper">
    <SmallSidebar />
    <BigSidebar />
    <VespaHistory />
  </div>
);

export default Reservationshistory;
