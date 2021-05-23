import styled from 'styled-components';
import { device } from '../Style/Breakpoints';

export const ListContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
  height: ${(props) => (props.isLoading ? '100vh' : 'auto')};
`;

export const ItemContainer = styled.div`
  background-color: ${(props) =>
    props.purchase === 'Soon'
      ? 'salmon'
      : props.purchase === 'Kind of Soon'
      ? 'yellow'
      : props.purchase === 'Not Soon'
      ? 'greenyellow'
      : props.purchase === 'Inactive'
      ? '#acc18a'
      : '#acc18a'};
  border-radius: 0.7rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  min-height: 9rem;
  /* & label {
    
    
  } */
  /* & input {
    margin-left: 1rem;
  } */
`;

export const TrashIcon = styled.span`
  color: #605b56;
`;

export const ItemName = styled.span`
  text-transform: capitalize;
  margin: 0 1rem;
  font-size: 1.8rem;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #605b56;
  cursor: pointer;
`;

export const UnorderedList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  gap: 2.5rem 2rem;
  margin-top: 2rem;
  @media only screen and ${device.sm} {
    grid-template-columns: 1fr 1fr;
    gap: 4rem 3rem;
    margin-top: 4rem;
  }
  /* @media only screen and ${device.md} {
    grid-template-columns: 1fr 1fr 1fr;
  } */
  @media only screen and ${device.lg} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
`;

export const Main = styled.div``;

export const Additional = styled.div``;

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
