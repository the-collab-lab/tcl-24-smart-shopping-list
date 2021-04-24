import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { useFirebase } from '../../hooks/useFirebase';
import { useForm } from '../../hooks/useForm';
import { useAlert } from '../../hooks/useAlert';

export const Form = () => {
  const [alertMessage, setTimeoutAlert, setAlertMessage] = useAlert();
  const token = localStorage.getItem('token');
  const { create, getAll } = useFirebase(token);
  const [values, handleInputChange, reset] = useForm({
    nameItem: '',
    selectTime: '',
    lastDate: null,
  });
  const [value] = useCollection(getAll());

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
    const itemName = values?.nameItem;
    const selectLength = values?.selectTime;

    if (isItemDuplicated(itemName)) {
      setAlertMessage({
        type: 'form-error-msn',
        message: 'Item is already on the list',
      });
      setTimeoutAlert();

      reset();
      return;
    }

    if (itemName && selectLength) {
      create({
        name: values.nameItem,
        time: values.selectTime,
        lastDate: null,
      });

      reset();

      setAlertMessage({
        type: 'form-success-msn',
        message: 'Data was send success',
      });
      setTimeoutAlert();
      return;
    }

    setAlertMessage({
      type: 'form-error-msn',
      message: 'Fill in all the blanks',
    });
    setTimeoutAlert();
  };

  return (
    <form onSubmit={sendToFirebase} className="form-item">
      <label htmlFor="fname">
        Name of item:
        <input
          type="text"
          name="nameItem"
          onChange={handleInputChange}
          value={values.nameItem}
        />
      </label>

      <div>
        <label className="form-radio-set">
          How soon are you likely to buy it again?
          <label>
            <input
              type="radio"
              name="selectTime"
              value="7"
              checked={values.selectTime === '7'}
              onChange={handleInputChange}
            />
            Soon (in the next 7 days)
          </label>
          <label>
            <input
              type="radio"
              name="selectTime"
              value="14"
              checked={values.selectTime === '14'}
              onChange={handleInputChange}
            />
            Kind of soon (in the next 14 days)
          </label>
          <label>
            <input
              type="radio"
              name="selectTime"
              value="30"
              checked={values.selectTime === '30'}
              onChange={handleInputChange}
            />
            Not soon (in the next 30 days)
          </label>
        </label>
      </div>

      <p>Last purchased date{values.lastDate}</p>
      <button type="submit">Send</button>

      {alertMessage && (
        <div className={alertMessage.type}> {alertMessage.message}</div>
      )}
    </form>
  );
};
