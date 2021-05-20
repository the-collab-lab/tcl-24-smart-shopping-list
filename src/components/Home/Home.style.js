import styled from 'styled-components';

import { colorPalet } from '../Style/Color.palette.js';

const { active, bg } = colorPalet;

export const HomeContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 375px;
  width: 100%;
  height: 90vh;
  background: ${bg};
  h1.HomeContainer-title {
    display: flex;
    align-items: center;
    font-size: 3.2rem;
    height: 10%;
  }
  img.HomeContainer-image {
    max-width: 100%;
    width: 30%;
    height: auto;
  }
  p.HomeContainer-label {
    display: flex;
    align-items: center;
    height: 10%;
    font-size: 1.6rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  height: 30%;
  margin: auto;
  /* background: red; */

  label.HomeContainer-Form-label {
    display: flex;
    flex-direction: column;
  }
  p.HomeContainer-Form-title {
    margin-bottom: 1%;
    font-size: 1.6rem;
  }
`;

export const Notification = styled.div`
  width: 80%;
  height: 10%;
  margin: auto;
  /* background: blue; */
`;
