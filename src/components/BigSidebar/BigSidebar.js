import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { BsTwitter } from 'react-icons/bs';
import { ImFacebook } from 'react-icons/im';
import { TfiGoogle } from 'react-icons/tfi';
import { FaPinterestP } from 'react-icons/fa';
import Logo from '../../assets/logo.png';
import NavLinks from '../Navlinks/NavLinks';
import Wrapper from '../../assets/Wrappers/BigSidebar';
import { logoutUser } from '../../redux/slices/userSlice';
import './BigSidebar.css';

const BigSidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    setTimeout(() => {
      dispatch(logoutUser());
    }, 1000);
    toast.success('Logout Successful!');
  };
  return (
    <Wrapper>
      <div className="show-sidebar">
        <div className="content">
          <header className="header">
            <img className="logo-img" src={Logo} alt="logo" />
          </header>
          <NavLinks />
          <button
            type="button"
            onClick={handleLogout}
            className=" ms-3 btn btn-outline-danger px-3 w-50 mt-3 logoutBtn"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="footer">
        <div className="socials">
          <BsTwitter fill="black" />
          <ImFacebook fill="black" />
          <TfiGoogle fill="black" />
          <FaPinterestP fill="black" />
        </div>
        <div className="text-black">@2023 Vespa Rental</div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
