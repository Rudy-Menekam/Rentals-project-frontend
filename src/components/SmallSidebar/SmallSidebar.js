import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import { toast } from 'react-toastify';
import NavLinks from '../Navlinks/NavLinks';
import { logoutUser } from '../../redux/slices/userSlice';

const SmallSidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch();

  const handleToggleSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const handleLinkClick = () => {
    setShowSidebar(false);
  };

  const handleLogout = () => {
    setTimeout(() => {
      dispatch(logoutUser());
    }, 1000);
    toast.success('Logout Successful!');
  };

  return (
    <>
      <button
        type="button"
        className="toggle-btn"
        onClick={handleToggleSidebar}
      >
        <AiOutlineMenu />
      </button>
      <div className={`sidebar-container ${showSidebar ? 'show-sidebar' : ''}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={handleCloseSidebar}>
            <FaTimes />
          </button>
          <header>
            {/* <img src={} alt="logo" className="logo" /> */}
          </header>
          <NavLinks onClick={handleLinkClick} />
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-outline-danger px-3 w-50 mt-3"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SmallSidebar;
