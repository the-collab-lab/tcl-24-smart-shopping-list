import React, { useState } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useForm } from '../../hooks/useForm';

export const Form = () => {
  const { create } = useFirebase('things');
  const [values, handleInputChange] = useForm({
    nameItem: '',
    selectTime: '',
  });
  const { nameItem, selectTime } = values;
  const [thing, setThing] = useState('');
  const sendToFB = (e) => {
    e.preventDefault();
    // create({ name: thing });
    console.log(values);
    e.target.reset();
  };
  const handleOnBlur = () => {};

  return (
    <div>
      <form onSubmit={sendToFB}>
        <label for="fname">
          Name of item:
          <input
            type="text"
            name="nameItem"
            onChange={handleInputChange}
            value={nameItem}
          />
        </label>
        <label>
          How soon are you likely to buy it again?
          <select
            name="selectTime"
            onBlur={handleOnBlur}
            onChange={handleInputChange}
            value={selectTime}
          >
            <option value="">Select</option>
            <option value="7">Soon (in the next 7 days)</option>
            <option value="14">Kind of soon (in the next 14 days)</option>
            <option value="30">Not soon (in the next 30 days)</option>
          </select>
        </label>
        <div>Last purchased date</div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
