// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { toast } from 'react-toastify';
// import {
//   BsTwitter, ImFacebook, TfiGoogle, FaPinterestP,
// } from 'react-icons/all';
// import Wrapper from '../../assets/Wrappers/BigSidebar';
// import NavLinks from '../Navlinks/NavLinks';
// import Logo from '../../assets/img_logo.jpg';
// import { logoutUser } from '../../redux/slices/userSlice';

// const Sidebar = () => {
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     setTimeout(() => {
//       dispatch(logoutUser());
//       toast.success('Logout Successful!');
//     }, 1000);
//   };

//   return (
//     <Wrapper>
//       <div className="show-sidebar">
//         <div className="content">
//           <header>
//             <img src={Logo} alt="logo" />
//           </header>
//           <NavLinks />
//           <button
//             type="button"
//             onClick={handleLogout}
//             className="ms-3 btn btn-outline-danger px-3 w-50 mt-3"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//       <div className="footer">
//         <div className="socials">
//           <BsTwitter fill="black" />
//           <ImFacebook fill="black" />
//           <TfiGoogle fill="black" />
//           <FaPinterestP fill="black" />
//         </div>
//         <div className="text-black">Vespa Rentals</div>
//       </div>
//     </Wrapper>
//   );
// };

// export default Sidebar;
