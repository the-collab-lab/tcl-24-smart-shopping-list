import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const FormStyled = styled.form`
  width: 100%;
  max-width: 700px;
  margin: 20px auto;
  padding: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 1rem;
  background: #f5f5f4;
  /* background: #605b56;
  background: #837a75; */
  text-align: center;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 2.5rem;
  border-radius: 0.25rem;
  width: 80%;
  padding: 1.25rem;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1rem;
  }

  label {
    font-size: 1.8rem;
    color: black;
    font-weight: bold;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      margin-right: 1.5rem;
    }
  }

  input {
    font-size: 1.8rem;
    background-color: white;

    @media (min-width: 768px) {
      width: 50%;
      font-size: 1.8rem;
    }
  }
`;

export const Legend = styled.strong`
  font-size: 1.6rem;
  /* color: white; */
  color: #605b56;
`;

export const LabelSet = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
  margin: 2rem auto;
  background: #f5f5f4;
  padding: 2rem;

  @media (min-width: 768px) {
    margin: 4rem auto;
  }
`;

export const LabelOption = styled.label`
  margin-bottom: 0.25rem;
  padding: 2rem;
  background: white;
  border-radius: 0.25rem;
  width: 100%;
  font-size: 1.4rem;
  text-align: left;
  display: block;
  position: relative;
  padding-left: 5rem;
  cursor: pointer;

  &:hover {
    background-color: #f2fbe0;
    color: black;
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
    background-color: #acc18a;
  }
`;

export const InputRadio = styled.input`
  display: none;
  &:checked ~ ${CustomRadio} {
    border: 0.2rem solid #acc18a;
    transition: all 0.25s ease-in-out;
  }
  &:checked ~ ${CustomRadio}:after {
    display: block;
  }
`;

export const Info = styled.span`
  margin-left: 0.1rem;
  color: #605b56;
  font-size: 1.2rem;

  &:hover {
    color: black;
  }
`;

export const Message = styled.p`
  margin: auto;
  margin-top: 2.5rem;
  background: ${(props) => (props.error ? '#f2dede' : '#f2fbe0')};
  color: ${(props) => (props.error ? '#a94442' : '#3c763d')};
  border-radius: 0.25rem;
  width: 80%;
  padding: 1.25rem;
  margin-bottom: 1rem;
  font-size: 1.6rem;
`;
