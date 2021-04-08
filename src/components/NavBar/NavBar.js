import { NavLink } from 'react-router-dom';
import './navBarStyle.css';

const NavBar = () => {
  return (
    <nav className="nav-container">
      <NavLink className="nav-link" exact to="/list">
        {' '}
        List
      </NavLink>
      <NavLink className="nav-link" exact to="/addItem">
        {' '}
        Add Item
      </NavLink>
    </nav>
  );
};

export default NavBar;
