import { NavLink } from 'react-router-dom';

import { NavBarContainer } from './NavBar.style.js';

const NavBar = () => (
  <NavBarContainer className="nav-container">
    <div>
      <NavLink className="nav-link" exact to="/list">
        <i className="fas fa-list-ul"></i>
        <span>List</span>
      </NavLink>
      <NavLink className="nav-link" exact to="/addItem">
        <i className="fas fa-plus"></i>
        <span>Add item</span>
      </NavLink>
    </div>
  </NavBarContainer>
);

export default NavBar;
