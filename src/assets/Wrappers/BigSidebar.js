import styled from 'styled-components';

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: #fff;
      min-height: 100vh;
      height: 100%;
      width: 300px;
      transition: 0.3s all ease-in-out;
    }
    .content {
      position: sticky;
      top: 0;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      /* padding-left: 2.5rem; */
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: #0f323b;
      padding: 1rem;
      font-size: 1.75rem;
      text-decoration: none;
      text-transform: capitalize;
      transition: 0.3s all ease-in-out;
    }

    .logout-btn:hover {
      background-color: #FF3131;
    }

    .active {
      background-color: #2258A2;
      border-radius: 0.5rem;
      color: #fff;
    }

    .footer {
      position: absolute;
      bottom: 0;
      margin: 0 auto;
      cursor: pointer;
      padding-left: 1rem;
      text-align: center;
      padding-bottom: 10px;
    }

    .socials {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
  }
  .logoutBtn {
    background-color: #2258A2 !important;
  }
  .logoutBtn:hover {
    background-color: #2258A2 !important;
  }
`;
export default Wrapper;
