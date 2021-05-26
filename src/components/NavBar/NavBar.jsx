import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import './navBarStyle.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <Logo>
        Shopping <span>List</span>
      </Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        <MenuLink exact to="/list">
          List
        </MenuLink>
        <MenuLink exact to="/addItem">
          Add Item
        </MenuLink>
      </Menu>
    </Nav>
  );
};

const Nav = styled.nav`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #f2fbe0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background: #605b56;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
    transition: max-height 0.3s ease-in;
  }
`;

const MenuLink = styled(NavLink)`
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  color: #605b56;
  transition: all 0.3s ease-in;

  &:hover {
    color: #837a75;
  }

  &.active {
    color: #acc18a;
  }
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: #605b56;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;

  & span {
    font-weight: 300;
  }
`;

export default NavBar;
