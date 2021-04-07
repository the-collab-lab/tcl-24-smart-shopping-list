import { NavLink } from 'react-router-dom';
import './navBarStyle.css';

const NavBar = () => {
  return (
    <nav>
      <NavLink exact to="/list">
        {' '}
        List
      </NavLink>
      <NavLink exact to="/addItem">
        {' '}
        Add Item
      </NavLink>
    </nav>
  );
};

export default NavBar;
