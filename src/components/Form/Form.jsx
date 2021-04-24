import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { useFirebase } from '../../hooks/useFirebase';
import { useForm } from '../../hooks/useForm';
import useNotification from '../../hooks/useNotification';

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
      });

      reset();

      setSuccess('Data was send successfully');
      return;
    }

    setError('Fill in all the blanks');
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

      {error && <p className="form-error-msn">{error}</p>}
      {success && <p className="form-success-msn">{success}</p>}
    </form>
  );
};
