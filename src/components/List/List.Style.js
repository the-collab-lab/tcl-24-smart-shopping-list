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
  background-color: #acc18a;
  border-radius: 0.7rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
  font-size: 1.6rem;
  margin: 0 1rem;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #605b56;
`;

export const UnorderedList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 2.5rem 2rem;
  margin-top: 2rem;
  @media only screen and ${device.sm} {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 4rem 3rem;
    margin-top: 4rem;
  }
  @media only screen and ${device.md} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
`;
