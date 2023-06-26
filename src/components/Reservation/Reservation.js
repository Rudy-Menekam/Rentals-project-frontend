import './Reservation.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReservation } from '../../redux/slices/reservationSlice';
import DateRange from '../DatePicker/DatePicker';

const Reservation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { vespas } = useSelector(vespas);
  const { vespas } = useSelector((state) => state.vespas);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('');
  const [fieldError, setFieldError] = useState(false);
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const initialVespaId = searchParams.get('vespaId');
  // const pickUpDate = new Date(2023, 5, 13); // Month is 0-based (0: January, 1: February, etc.)
  // const returnDate = new Date(2023, 5, 29); // Month is 0-based (0: January, 1: February, etc.)
  // const [reservationData, setReservationData] = useState({
  //   city: 'london',
  //   pick_up_date: pickUpDate.toISOString(), // Convert date to string format accepted by the API
  //   return_date: returnDate.toISOString(), // Convert date to string format accepted by the API
  //   vespa_id: initialVespaId ? parseInt(initialVespaId, 10) : null,
  // });
  const [reservationData, setReservationData] = useState({
    pick_up_date: '',
    end_date: '',
    city: '',
    vespa_id: '',
    user_id: 1,
  });

  const handleReservation = () => {
    // Check if any required field is empty
    if (
      !reservationData.vespa_id
      || !selectedStartDate
      || !selectedEndDate
      || !selectedCity
    ) {
      setFieldError(true);
      setTimeout(() => {
        setFieldError(false);
      }, 3000);
      return;
    }
    // Find the selected car based on its id
    const selectedVespa = vespas.find(
      (vespa) => vespa.id === parseInt(reservationData.vespa_id, 10),
    );

    if (selectedVespa) {
      // Update the car_id with the actual car_id value
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
        <div className="wrapper-reservation">
          <div className="container w-50">
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

            <h1 className="header-book">BOOK A Vespa</h1>
            <hr className="horizontal-line" />
            <div className="bookForm">
              <div className="d-flex flex-column gap-2 justify-content-center align-items-baseline">
                <DateRange
                  selectedStartDate={selectedStartDate}
                  selectedEndDate={selectedEndDate}
                  onStartDateChange={setSelectedStartDate}
                  onEndDateChange={setSelectedEndDate}
                />
                <div className="select-container">
                  <select
                    value={reservationData.vespa_id}
                    onChange={(e) => setReservationData({
                      ...reservationData,
                      vespa_id: e.target.value,
                    })}
                  >
                    <option value="">Select a Vespa</option>
                    {vespas.map((vespa) => (
                      <option key={vespa.id} value={vespa.id}>{vespa.name}</option>
                    ))}
                  </select>
                  {/* <select
                    className="select-car"
                    defaultValue={reservationData.vespa_id || initialVespaId}
                    onChange={(e) => setReservationData({
                      ...reservationData,
                      vespa_id: e.target.value,
                    })}
                  >
                    <option value=" ">
                      Select A Vespa
                    </option>
                    {vespas.map((vespa) => (
                      <option key={vespa.id} value={vespa.id}>
                        {vespa.name}
                      </option>
                    ))}
                  </select> */}

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
