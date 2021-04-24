import React, { useState } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useForm } from '../../hooks/useForm';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useError } from '../../hooks/useError';

export const Form = () => {
  const [error, setTimeoutError, setError] = useError();
  const token = localStorage.getItem('token');
  const { create, getAll } = useFirebase(token);

  const [success, setSuccess] = useState(null);

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
      setError('Item is already on the list');
      setTimeoutError();
      // e.target.reset();
      reset();
      return;
    }

    if (itemName && selectLength) {
      create({
        name: values.nameItem,
        time: values.selectTime,
        lastDate: null,
      });

      // e.target.reset();

      reset();

      setSuccess('Data was send success');
      setTimeoutError();
      return;
    }

    setError('Fill in all the blanks');
    setTimeoutError();
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
      {error && <div className="form-error-msn">{error}</div>}
      {success && <div className="form-success-msn">{success}</div>}
    </form>
  );
};
