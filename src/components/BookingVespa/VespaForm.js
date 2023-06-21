import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewVespa, fetchVespas } from '../../redux/slices/vespaSlice';

const VespaForm = () => {
  const dispatch = useDispatch();
  const { vespas } = useSelector(state => state.cars);
  const [vespaData, setVespaData] = useState({
    name: '',
    description: '',
    photo: '',
    price: '',
    model: '',
  });
  const [message, setMessage] = useState('');

  const handleCreateNewCar = async e => {
    e.preventDefault();

    if (Object.values(vespaData).some(value => value === '')) {
      setMessage('Please fill out all fields');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      return;
    }

    try {
      await dispatch(createNewCar(vespaData));
      await dispatch(fetchVespas());
      setVespaData({
        name: '',
        description: '',
        photo: '',
        price: '',
        model: '',
      });
      setMessage('The Vespa model was created successfully');
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      setMessage('The is an error while creating vespa');
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setVespaData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="w-50 container-b-form container">
      <form onSubmit={handleCreateNewVespa}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <label className="mb-4 h5 d-flex flex-column">
            Name:
            <input
              className="mt-2 add-input"
              type="text"
              name="name"
              value={vespaData.name}
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-4  h5 d-flex flex-column">
            Description:
            <input
              className="mt-2 add-input"
              type="text"
              name="description"
              value={vespaData.description}
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-4 h5 d-flex flex-column">
            Photo:
            <input
              className="mt-2 add-input"
              type="text"
              name="photo"
              value={vespaData.photo}
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-2 h5 d-flex flex-column">
            Price:
            <input
              className="mt-2 add-input"
              type="text"
              name="price"
              value={vespaData.price}
              onChange={handleInputChange}
            />
          </label>
          <label className="mb-2 h5 d-flex flex-column">
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
      {message && (
        <p className={`mt-2 alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} text-center`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default VespaForm;
