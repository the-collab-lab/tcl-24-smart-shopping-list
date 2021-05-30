import styled from 'styled-components';

import { colorPalet } from '../Style/Color.palette.js';
import { device } from '../Style/Breakpoints';
import { Input } from '../Style/Input.Style';
import { Button } from '../Style/Button.Style.js';

const { primary, secundary, bgApp, active, dark } = colorPalet;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
  height: 90vh;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 375px;
  height: 80%;
  margin: auto;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 2rem;
  background: ${dark};
  text-align: center;

  @media ${device.sm} {
    width: 420px;
    height: 75%;
    min-width: 420px;
    max-height: 600px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 80%;
  text-align: center;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: center;
  }

  label {
    font-size: 1.6rem;
    color: black;
    color: white;
    font-weight: bold;
    margin-bottom: 1rem;

    @media ${device.sm} {
      margin-right: 1.5rem;
    }
  }
`;

export const Legend = styled.strong`
  font-size: 1.6rem;
  color: ${dark};
`;

export const BottomSection = styled.div`
  width: 100%;
  height: 80%;
  background: ${bgApp};
  border-top-right-radius: 2rem;
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;

  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);

  @media ${device.sm} {
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
  }
`;

export const LabelSet = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
  margin: 2rem auto;
  background: ${bgApp};
  border-radius: 2rem;

  @media ${device.sm} {
    margin: 4rem auto;
    width: 70%;
  }
`;

export const LabelOption = styled.label`
  margin: 1rem 0;
  margin-bottom: 0.25rem;
  padding: 2rem 0;
  background: white;
  border-radius: 2.5rem;
  width: 100%;
  font-size: 1.4rem;
  text-align: left;
  display: block;
  position: relative;
  padding-left: 5rem;
  cursor: pointer;
  border-style: 5px solid red;
  color: black;

  &:hover {
    background: ${active};
    color: black;
    font-weight: bold;
  }
`;

export const CustomRadio = styled.span`
  position: absolute;
  top: 1.6rem;
  left: 1.2rem;
  height: 2.5rem;
  width: 2.5rem;
  border: 0.3rem solid #acc18a;
  border-radius: 50%;
  &::after {
    content: '';
    position: absolute;
    display: none;
    top: 0.31rem;
    left: 0.31rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: ${primary};
  }
`;

export const InputRadio = styled.input`
  display: none;
  &:checked ~ ${CustomRadio} {
    border: 0.2rem solid ${primary};
    transition: all 0.25s ease-in-out;
  }
  &:checked ~ ${CustomRadio}:after {
    display: block;
  }
`;

export const Info = styled.span`
  margin-left: 0.1rem;
  color: ${dark};
  font-size: 1.2rem;

  &:hover {
    color: black;
  }
`;

export const Message = styled.p`
  margin: auto;
  margin-top: 1.5rem;
  background: ${(props) => (props.error ? '#f2dede' : '#f8fdef')};
  color: ${(props) => (props.error ? '#a94442' : '#3c763d')};
  font-weight: bold;
  border-radius: 2.5rem;
  width: 80%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;

  @media ${device.sm} {
    padding: 1.25rem;
  }
`;

export const InputForm = styled(Input)`
  position: relative;
  width: 70%;
  height: 3.2rem;
  border-radius: 100px 100px 100px 100px;
  font-size: 1.6rem;
  background-color: #f8fdef;
  border: 0.1rem solid;
  border-color: ${dark};
  align-self: center;

  @media ${device.sm} {
    align-self: start;
    width: 55%;
  }
`;

export const ButtonForm = styled(Button)`
  background: ${dark};
  font-size: 1.2rem;
  font-weight: bolder;
  text-transform: uppercase;
  color: ${bgApp};
  padding: 1.2rem 0.8rem;
  &:hover {
    background: ${secundary};
    color: ${active};
  }
`;
