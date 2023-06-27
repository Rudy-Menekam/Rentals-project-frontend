import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SmallSidebar from '../SmallSidebar/SmallSidebar';
import BigSidebar from '../BigSidebar/BigSidebar';
import { deleteReservation } from '../../redux/slices/vespaSlice';
import { getReservations } from '../../redux/slices/reservationSlice';

const MyReservations = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.vespas.reservations);

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteReservation(id));
  };

  return (
    <>
      <div className="sliderwrapper">
        <SmallSidebar />
        <BigSidebar />
        <div className="wrapper-my-reservation background-tint overflow-auto">
          <h2 className="text-white text-center my-3 h1 bg-dark p-2 mt-5">
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
