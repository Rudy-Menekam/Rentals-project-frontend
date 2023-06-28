/* eslint-disable */
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './VespaHistory.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVespa, removeVespa } from '../../redux/slices/vespaSlice';

const VespaHistory = () => {
  const { vespas } = useSelector((state) => state.vespas);
  const dispatch = useDispatch();

  const handleRemoveVespa = (vespaId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Vespa?');
    if (confirmDelete) {
      dispatch(removeVespa(vespaId));
      dispatch(deleteVespa(vespaId));
    }
  };

  return (
    <div className="d-flex flex-wrap justify-content-center p-3 gap-4 mt-5 w-100">
      {vespas &&
        vespas.map((vespa) => (
          <Card key={vespa.id} className="history-card">
            <Card.Img variant="top" src={vespa.photo} />
            <Card.Body className="card-body">
              <Card.Title>{vespa.name}</Card.Title>
              <Button variant="danger" onClick={() => handleRemoveVespa(vespa.id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default VespaHistory;
