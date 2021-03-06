import { colorPalet } from '../Style/Color.palette.js';
import { device } from '../Style/Breakpoints.js';
import styled from 'styled-components';

const { bgApp, active, dark } = colorPalet;
const { sm } = device;

export const NavBarContainer = styled.nav`
  display: flex;
  position: fixed;
  bottom: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 375px;
  width: 100%;
  height: 10vh;
  background: ${bgApp};
  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 30%;
    height: 3.2rem;
    border-radius: 100px 100px 100px 100px;
    font-size: 1.2rem;
    background-color: ${dark};
    border: 0.1rem solid ${dark};
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);
  }
  span {
    display: none;
  }
  a.nav-link {
    text-decoration: none;
    font-weight: bold;
    text-transform: uppercase;
    padding: 1.2rem 0.8rem;
    i {
      font-size: 2rem;
      color: ${bgApp};
      &:hover {
        color: ${active};
      }
    }
  }

  @media ${sm} {
    width: 420px;
    height: 10vh;
    position: relative;
    min-width: 420px;
    margin: auto;
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);
    border-radius: 2rem;
    div {
      width: 50%;
    }
    i {
      display: none;
    }
    span {
      display: block;
      font-size: 1.2rem;
      font-weight: bold;
      text-transform: uppercase;
      color: ${bgApp};
      &:hover {
        color: ${active};
      }
    }
  }
`;
