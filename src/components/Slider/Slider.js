/* eslint-disable */
// import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Slider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
  TiSocialTwitterCircular,
  TiSocialPinterestCircular,
  TiSocialFacebookCircular,
} from 'react-icons/ti';
import { BsCardChecklist } from 'react-icons/bs';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVespas } from '../../redux/slices/vespaSlice';

const Slider = (props) => {
  const dispatch = useDispatch();
  const vespas = useSelector((state) => state.vespas.vespas);
  const loading = useSelector((state) => state.vespas.loading);

  useEffect(() => {
    dispatch(fetchVespas());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <div className="slider-title text-center">
        <h2 className="text-center">Latest Models</h2>
        <span>Please select a model</span>
      </div>
      <div className="slider-btns">
        <div className="swiper-prev">
          <IoIosArrowBack />
        </div>
        <div className="swiper-next">
          <IoIosArrowForward />
        </div>
      </div>
      <div
        style={{ width: '90%', position: 'relative' }}
        className="responsive-slider"
      >
        <Swiper
          spaceBetween={50}
          slidesPerView={2}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 100,
            },

            1024: {
              idesPerView: 2,
              spaceBetween: 50,
            },
          }}
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
          }}
        >
          {vespas.map((vespa) => (
            <SwiperSlide key={vespa.id}>
              <Link to={`/detailsPage/${vespa.id}`} className="wrapper">
                <div className="slide-container">
                  <img className="vespa" src={vespa.photo} alt="vespa" />
                </div>
                <div className="vespa-info text-center">
                  <h3 className="vespa-title">{vespa.name}</h3>
                  <p className="vespa-description">
                    {vespa.description}
                    {' '}
                    <span className="vespa-description">{vespa.model}</span>
                  </p>

                  <div className="slide-socials">
                    <TiSocialFacebookCircular fill="thistle" className="icon" />
                    <TiSocialTwitterCircular fill="thistle" className="icon" />
                    <TiSocialPinterestCircular
                      fill="thistle"
                      className="icon"
                    />
                  </div>
                </div>
              </Link>
              {' '}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
