import { colorPalet } from '../Style/Color.palette.js';
import { Button } from '../Style/Button.Style.js';
import { Input } from '../Style/Input.Style.js';
import styled from 'styled-components';
import { device } from '../Style/Breakpoints.js';

const { secundary, bgApp, active, dark } = colorPalet;
const { sm } = device;

export const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 375px;
  width: 100%;
  height: 90vh;
  background: ${bgApp};
  @media ${sm} {
    width: 420px;
    min-width: 420px;
    margin: auto;
    border-radius: 2rem;
    height: 80vh;
    box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);
  }
`;

export const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 55%;
  h1.TopSection-title {
    text-align: center;
    font-size: 3rem;
    text-transform: uppercase;
    width: 100%;
    height: 10%;
    color: ${dark};
    font-family: 'Josefin Sans', sans-serif;
  }
  img.TopSection-image {
    max-width: 100%;
    width: 20%;
    height: auto;
    margin-top: 2%;
  }
  p.TopSection-label {
    display: flex;
    align-items: center;
    height: 10%;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${dark};
  }
`;

export const BottonSection = styled.div`
  width: 100%;
  height: 45%;
  background: ${dark};
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
  box-shadow: 0 0px 6px rgba(0, 0, 0, 0.2);
  @media ${sm} {
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }
`;

export const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60%;
  margin: auto;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  label.BottonSection-Form-label {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 50%;
    width: 100%;
  }
  p.BottonSection-Form-title {
    margin-bottom: 1%;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${bgApp};
  }
`;

export const Notification = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40%;
  margin: auto;
  color: ${bgApp};
  p {
    position: absolute;
    top: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .progress-3 {
    position: absolute;
    top: 0;
    width: 120px;
    height: 20px;
    border-radius: 20px;
    background: repeating-linear-gradient(
          135deg,
          #837a75 0 10px,
          #dafeb7 0 20px
        )
        left/0% 100% no-repeat,
      repeating-linear-gradient(135deg, #ddd 0 10px, #eee 0 20px) left/100% 100%;
    animation: p3 2s infinite;
  }
  @keyframes p3 {
    100% {
      background-size: 100% 100%;
    }
  }
`;

export const ButtonHome = styled(Button)`
  background: ${dark};
  font-size: 1rem;
  font-weight: bolder;
  text-transform: uppercase;
  color: ${bgApp};
  padding: 1.2rem 0.8rem;
  &:hover {
    background: ${secundary};
    color: ${active};
  }
`;

export const InputHome = styled(Input)`
  position: relative;
  width: 70%;
  height: 3.2rem;
  border-radius: 100px 100px 100px 100px;
  font-size: 1.2rem;
  background-color: #f8fdef;
  border: 0.1rem solid ${dark};
`;

export const ButtonHomeSearch = styled(Button)`
  position: absolute;
  top: 51%;
  left: 75%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: none;
  box-shadow: none;
  i {
    font-size: 1.8rem;
    color: ${dark};
  }
  &:hover {
    background: none;
  }
`;
