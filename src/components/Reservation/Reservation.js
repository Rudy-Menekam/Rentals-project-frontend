import './Reservation.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReservation } from '../../redux/slices/reservationSlice';
import { fetchVespas } from '../../redux/slices/vespaSlice';
import DateRange from '../DatePicker/DatePicker';
import SmallSidebar from '../SmallSidebar/SmallSidebar';
import BigSidebar from '../BigSidebar/BigSidebar';

const Reservation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('');
  const [fieldError, setFieldError] = useState(false);
  const [reservationData, setReservationData] = useState({
    vespa_id: '',
    pick_up_date: selectedStartDate.toISOString(),
    return_date: selectedEndDate.toISOString(),
    city: selectedCity,
    user_id: 1,
  });

  const vespas = useSelector((state) => state.vespas.vespas) || [];

  useEffect(() => {
    dispatch(fetchVespas());
  }, [dispatch]);

  const handleReservation = () => {
    if (reservationData.start_date && reservationData.end_date
      && reservationData.city && reservationData.vespa_id
    ) {
      setFieldError(true);
      setTimeout(() => {
        setFieldError(false);
      }, 3000);
      return;
    }
    const selectedVespa = vespas.find(
      (vespa) => vespa.id === parseInt(reservationData.vespa_id, 10),
    );
    if (selectedVespa) {
      const vespaId = selectedVespa.id;
      const updatedReservationData = {
        ...reservationData,
        vespa_id: vespaId,
        pick_up_date: selectedStartDate.toISOString(),
        return_date: selectedEndDate.toISOString(),
        city: selectedCity,
      };
      dispatch(createReservation(updatedReservationData));
      navigate('/myreservations');
    }
  };

  return (
    <>
      <div className="sliderwrapper">
        <BigSidebar />
        <SmallSidebar />
        <div className="wrapper-reservation">
          <div className="container w-50 ">
            {fieldError && (
              <p className="error-message alert alert-danger mt-2">
                Please fill in the following required fields:
                {!reservationData.vespa_id && (
                  <>
                    <span className="me-2 text-danger">Vespa</span>
                  </>
                )}
                {!selectedStartDate && (
                  <>
                    <span className="me-2 text-danger">Start Date</span>
                  </>
                )}
                {!selectedEndDate && (
                  <>
                    <span className="me-2 text-danger">End Date</span>
                  </>
                )}
                {!selectedCity && (
                  <>
                    <span className="me-2 text-danger">City</span>
                  </>
                )}
              </p>
            )}

            <h1 className="header-book">Book a Vespa</h1>
            <hr className="horizontal-line" />
            <div className="bookForm">
              <div className="input-from">
                <DateRange
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                  onStartDateChange={setSelectedStartDate}
                  onEndDateChange={setSelectedEndDate}
                />
                <div className="select-container">
                  <select
                    className="select-car"
                    value={reservationData.vespa_id}
                    onChange={(e) => setReservationData({
                      ...reservationData,
                      vespa_id: e.target.value,
                    })}
                  >
                    <option value="">Select a vespa</option>
                    {vespas.map((vespa) => (
                      <option key={vespa.id} value={vespa.id}>{vespa.name}</option>
                    ))}
                  </select>
                  <select
                    className="select-car"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option disabled selected value="">
                      Select City
                    </option>
                    <option value="London">London</option>
                    <option value="Manchester">Manchester</option>
                    <option value="Glasgow">Glasgow</option>
                    <option value="Bristol">Bristol</option>
                  </select>
                </div>
              </div>
              <div className="header-book">
                <button
                  type="button"
                  onClick={handleReservation}
                  className="button-book-now mt-4"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Reservation;
