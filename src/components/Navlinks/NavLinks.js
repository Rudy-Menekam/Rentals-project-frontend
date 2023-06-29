import React from 'react';
import { NavLink } from 'react-router-dom';
import links from '../../utils/links';

// eslint-disable-next-line
const NavLinks = ({ handleLinkClick }) => (
  <div className="nav-links">
    {links.map((link) => {
      const { text, id, path } = link;
      return (
        <NavLink
          to={path}
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          key={id}
          onClick={() => {
            handleLinkClick();
          }}
          end
        >
          {text}
        </NavLink>
      );
    })}
  </div>
);

export default NavLinks;
