import styled from 'styled-components';
import { colorPalet } from './Color.palette';
const { primary, secundary, bgApp, active } = colorPalet;

export const Button = styled.button`
  padding: 0.8rem 1.4rem;
  border: none;
  text-align: center;
  color: ${(props) => (props.primary ? 'black' : 'white')};
  background: ${(props) => (props.primary ? primary : secundary)};
  border-radius: 0.7rem;
  font-size: 1.3rem;
  font-weight: bold;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${bgApp};
    color: black;
  }

  &:active {
    background-color: ${active};
    color: black;
  }
`;
