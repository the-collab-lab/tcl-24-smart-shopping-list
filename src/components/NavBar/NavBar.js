import React from 'react';
import { NavLink } from 'react-router-dom';
import './navBar-style.css';

const NavBar = () => {
  return (
    <nav>
      <NavLink exact to="/list">
        List
      </NavLink>

      <NavLink exact to="/addItem">
        Add Item
      </NavLink>
    </nav>
  );
};

export default NavBar;
