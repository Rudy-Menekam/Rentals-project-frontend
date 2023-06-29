/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewVespa, fetchVespas } from '../../redux/slices/vespaSlice';
import 'bootstrap/dist/css/bootstrap.min.css';


const BookingForm = () => {
  const dispatch = useDispatch();
  // const { vespas } = useSelector((state) => state.vespas);
  const [vespaData, setVespaData] = useState({
    name: '',
    description: '',
    photo: '',
    price: '',
    model: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleCreateNewVespa = async (e) => {
    e.preventDefault();
    // Check if any field is empty
    const isAnyFieldEmpty = Object.values(vespaData).some(
      (value) => value === '',
    );
    if (isAnyFieldEmpty) {
      // Display error message to fill out the empty field
      setErrorMessage('Please fill out all fields');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
    await dispatch(createNewVespa(vespaData));
    dispatch(fetchVespas()); // Fetch vespas after new vespa creation
    setVespaData({
      name: '',
      description: '',
      photo: '',
      price: '',
      model: '',
    });
    setSuccessMessage('Vespa created successfully');
    // Clear success message after a delay (e.g., 3 seconds)
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  const handleInputChange = (e) => {
    setVespaData({
      ...vespaData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-50 container-b-form container">
      <form onSubmit={handleCreateNewVespa}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <label className="mb-4 h5 d-flex flex-column" htmlFor="name">
            Name:
            <input
              className="mt-2 add-input"
              type="text"
              name="name"
              value={vespaData.name}
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-4  h5 d-flex flex-column" htmlFor="description">
            Description:
            <input
              className="mt-2 add-input"
              type="text"
              name="description"
              value={vespaData.description}
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-4 h5 d-flex flex-column" htmlFor="photo">
            Photo:
            <input
              className="mt-2 add-input"
              type="text"
              name="photo"
              value={vespaData.photo}
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-2 h5 d-flex flex-column" htmlFor="price">
            Price:
            <input
              className="mt-2 add-input"
              type="text"
              name="price"
              value={vespaData.price}
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-2 h5 d-flex flex-column" htmlFor="model">
            Model:
            <input
              className="mt-2 add-input"
              type="text"
              name="model"
              value={vespaData.model}
              onChange={handleInputChange}
            />
          </label>
          <input className="mt-4 button-b-form" type="submit" value="Submit" />
        </div>
      </form>
      {successMessage && (
        <p className="mt-2 alert alert-success text-center">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mt-2 alert alert-danger text-center">
          Please fill out all fields
        </p>
      )}
    </div>
  );
};

export default BookingForm;
