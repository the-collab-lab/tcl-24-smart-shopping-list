import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { useFirebase } from '../../hooks/useFirebase';
import { useForm } from '../../hooks/useForm';
import useNotification from '../../hooks/useNotification';

import {
  FormWrapper,
  FormStyled,
  FormGroup,
  Legend,
  LabelSet,
  LabelOption,
  CustomRadio,
  Info,
  InputRadio,
  Message,
  BottomSection,
  InputForm,
  ButtonForm,
} from './Form.Style';

export const Form = () => {
  const { error, setError, setLoad, success, setSuccess } = useNotification();
  const token = localStorage.getItem('token');
  const { create, getAll } = useFirebase();

  const [values, handleInputChange, reset] = useForm({
    nameItem: '',
    selectTime: '',
    lastDate: null,
  });

  const firebasePath = getAll().doc(token).collection('items');

  const [value] = useCollection(firebasePath);

  const isItemDuplicated = (name) => {
    const puntuaction = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

    return value?.docs?.some(
      (doc) =>
        doc.data().name.toLowerCase().replace(puntuaction, '') ===
        name.toLowerCase().replace(puntuaction, ''),
    );
  };

  const sendToFirebase = (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    const itemName = values?.nameItem;
    const selectLength = values?.selectTime;

    if (isItemDuplicated(itemName)) {
      setLoad('');
      setError('Item is already on the list');
      reset();
      return;
    }

    if (itemName && selectLength) {
      setLoad('');
      create(token, {
        name: values.nameItem,
        time: values.selectTime,
        lastDate: null,
        times: 0,
        lastEstimate: 0,
      });

      reset();

      setSuccess('The item has been added to the list');
      return;
    }

    setError('Fill in all the blanks');
  };

  return (
    <FormWrapper>
      <FormStyled onSubmit={sendToFirebase}>
        <FormGroup>
          <label htmlFor="fname">Name of item:</label>
          <InputForm
            type="text"
            name="nameItem"
            onChange={handleInputChange}
            value={values.nameItem}
          />
        </FormGroup>

        <BottomSection>
          <LabelSet>
            <Legend>How soon are you likely to buy it again?</Legend>
            <LabelOption>
              Soon <Info>-in the next 7 days-</Info>
              <InputRadio
                type="radio"
                name="selectTime"
                value="7"
                checked={values.selectTime === '7'}
                onChange={handleInputChange}
              />
              <CustomRadio></CustomRadio>
            </LabelOption>
            <LabelOption>
              Kind of soon <Info>-in the next 14 days-</Info>
              <InputRadio
                type="radio"
                name="selectTime"
                value="14"
                checked={values.selectTime === '14'}
                onChange={handleInputChange}
              />
              <CustomRadio></CustomRadio>
            </LabelOption>
            <LabelOption>
              Not soon <Info>-in the next 30 days-</Info>
              <InputRadio
                type="radio"
                name="selectTime"
                value="30"
                checked={values.selectTime === '30'}
                onChange={handleInputChange}
              />
              <CustomRadio></CustomRadio>
            </LabelOption>
          </LabelSet>

          <ButtonForm type="submit">ADD ITEM</ButtonForm>

          {error && <Message error>{error}</Message>}
          {success && <Message>{success}</Message>}
        </BottomSection>
      </FormStyled>
    </FormWrapper>
  );
};
