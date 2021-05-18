import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.8rem 1.4rem;
  border: none;
  text-align: center;
  color: ${(props) => (props.primary ? 'black' : 'white')};
  background: ${(props) => (props.primary ? '#acc18a' : '#837A65')};
  border-radius: 0.7rem;
  font-size: 1.3rem;
  font-weight: bold;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #f2fbe0;
    color: black;
  }

  &:active {
    background-color: #dafeb7;
    color: black;
  }
`;
