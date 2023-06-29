import './Reservation.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, deleteReservation, removeReservation } from '../../redux/slices/reservationSlice';
import SmallSidebar from '../SmallSidebar/SmallSidebar';
import BigSidebar from '../BigSidebar/BigSidebar';

const MyReservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);
  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleDelete = (id) => {
    // eslint-disable-next-line no-alert
    const confirmDelete = window.confirm('Are you sure you want to delete this Reservation?');
    if (confirmDelete) {
      dispatch(removeReservation(id));
      dispatch(deleteReservation(id));
    }
  };

  return (
    <>
      <div className="sliderwrapper">
        <BigSidebar />
        <SmallSidebar />
        <div className="wrapper-reservation ">
          <h2 className="header-text text-white text-center my-3 h1 p-2 mt-5">
            My Reservations
          </h2>
          <div className="row justify-content-center p-3">
            {reservations.map((reservation) => (
              <div
                className="col-10 col-md-6 col-lg-4 col-xl-3 my-4 text-center"
                key={reservation.id}
              >
                <div className="card text-white bg-dark bg-opacity-75  border ">
                  <div className="card-body">
                    <h2 className="card-title text-decoration-underline">
                      {reservation.vespa}
                    </h2>
                    <p className="card-text">
                      City:
                      {reservation.city}
                    </p>
                    <p className="card-text">
                      Pick-up Date:
                      {' '}
                      {reservation.pick_up_date}
                    </p>
                    <p className="card-text">
                      Return Date:
                      {' '}
                      {reservation.return_date}
                    </p>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(reservation.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReservations;
