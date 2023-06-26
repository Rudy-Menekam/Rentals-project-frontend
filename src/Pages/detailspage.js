import React from 'react';
import SmallSidebar from '../components/SmallSidebar/SmallSidebar';
import BigSidebar from '../components/BigSidebar/BigSidebar';
import VespaDetails from '../components/VespaDetails/VespaDetails';

const Detailspage = (props) => {
  return (
    <div className="sliderwrapper">
      <SmallSidebar />
      <BigSidebar />
      <VespaDetails />
    </div>
  );
};

export default Detailspage;
