import styled from 'styled-components';
import { device } from '../Style/Breakpoints';
import { Input } from '../Style/Input.Style';
import { Button } from '../Style/Button.Style';

export const ListContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 3rem 0;
  min-width: 30rem;
  width: 100%;
  background: #f2fbe0;
  max-height: 85vh;
  @media only screen and ${device.sm} {
    width: 40rem;
    min-width: 40rem;
    margin: 2rem auto;
    border-radius: 2rem;
    box-shadow: 0 0 0.6rem rgba(0, 0, 0, 0.2);
  }
  @media only screen and ${device.md} {
    padding: 3rem;
    width: 70rem;
    min-width: 60rem;
  }
  @media only screen and ${device.lg} {
    width: 90rem;
    min-width: 80rem;
  }
`;

export const NewInput = styled(Input)`
  height: 3.2rem;
  font-size: 1.4rem;
  background-color: #f8fdef;
  border: 0.1rem solid #605b56;
  padding: 0 1rem;
  margin-bottom: 1.5rem;
`;

export const Description = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr 2rem 1fr;
  padding: 0 3rem;
  margin: 1rem 0;
  @media only screen and ${device.md} {
    display: flex;
  }
  & span {
    font-size: 1.4rem;
    padding: 0 0.5rem;
  }
`;

export const Dot = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.color};
  justify-self: flex-end;
  @media only screen and ${device.md} {
    margin-right: 0.2rem;
    margin-left: 2rem;
  }
`;

export const ItemContainer = styled.div`
  background-color: ${(props) =>
    props.purchase === 'Soon'
      ? '#dd6450'
      : props.purchase === 'Kind of Soon'
      ? '#acc18a'
      : props.purchase === 'Not Soon'
      ? '#b8a46e'
      : props.purchase === 'Inactive'
      ? '#B8B8B8'
      : '#acc18a'};
  border-radius: 0.7rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  min-height: 16rem;
  @media only screen and ${device.lg} {
    min-height: 20rem;
  }
`;

export const ItemName = styled.span`
  text-transform: capitalize;
  margin: 0 1rem;
  font-size: 2rem;
  font-weight: 700;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  background-color: #f2fbe0;
  border-radius: 4px;
  color: #605b56;
  cursor: pointer;
  padding: 7px;
`;

export const EditDeleteContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

export const UnorderedList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 2.5rem 2rem;
  margin-top: 2rem;
  /* height: 80vh; */
  overflow: scroll;
  @media only screen and ${device.md} {
    grid-template-columns: 1fr 1fr;
    gap: 4rem 3rem;
  }
  @media only screen and ${device.lg} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
`;

export const LastPurchase = styled.p`
  font-size: 1.6rem;
  margin: 1rem 0;
`;

export const NumberPurchase = styled.p`
  font-size: 1.6rem;
  margin: 1rem 0;
`;

export const NextDate = styled.p`
  font-size: 1.6rem;
  margin: 1rem 0;
`;

export const NewButton = styled(Button)`
  background: none;
  box-shadow: none;
  margin-bottom: 1.2rem;
  padding: 0 0.3rem;
  i {
    font-size: 1.8rem;
    color: #605b56;
  }
  &:hover {
    background: none;
  }
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${(props) => (props.checked ? '#605B56' : 'papayawhip')};
  border-radius: 3px;
  transition: all 150ms;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

export const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
