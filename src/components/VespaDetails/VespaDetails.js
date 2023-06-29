/* eslint-disable */
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { FiSettings } from 'react-icons/fi';
import { BsArrowRightCircle } from 'react-icons/bs';
import { BiLeftArrow } from 'react-icons/bi';
import './VespaDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVespa } from '../../redux/slices/vespaSlice';

const VespaDetails = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleVespa } = useSelector((state) => state.vespas);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchVespa(id));
  }, [id]);

  const handleReserve = () => {
    navigate(`/bookride?vespaId=${singleVespa.id}`);
  };

  return (
    <div className="vespa-details-container d-flex w-100">
      <div className="d-flex flex-column w-100 justify-content-start align-items-center">
        <div className="img-container">
          <img
            src={singleVespa.photo}
            alt={singleVespa.name}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div className="d-flex flex-column justify-content-start align-items-center gap-4">
        <h2 className="d-flex align-items-center gap-2">
          {' '}
          <Link to="/homepage">
            <button className="back-btn">
              <BiLeftArrow fill="#087f9c" />
            </button>
          </Link>
          {singleVespa.name}
        </h2>
        <ul>
          <li className="d-flex gap-2">
            <div>Finance fee:</div>
            <div>
              $
              {singleVespa.price}
            </div>
          </li>
          <li className="d-flex gap-2">
            <div>Option to purchase fee:</div>
            <div>$249</div>
          </li>
          <li className="d-flex gap-2">
            <div>Total amount payable:</div>
            <div>$249</div>
          </li>
          <li className="d-flex gap-2">
            <div>Duration:</div>
            <div>48 months</div>
          </li>
        </ul>
        <div>
          <span>5.9% APR </span>
          Representative
        </div>
        <Link
          to="/"
          className="d-flex justify-content-between align-items-center gap-2 nav-link"
        >
          DISCOVER MORE MODELS
          <IoIosArrowForward fill="black" />
        </Link>
        <button
          type="button"
          onClick={handleReserve}
          className="arrow-reserve-btn d-flex justify-content-between align-items-center gap-2"
        >
          <FiSettings />
          {' '}
          Reserve
          <BsArrowRightCircle />
        </button>
      </div>
    </div>
  );
};

export default VespaDetails;
