import React, { useState } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useForm } from '../../hooks/useForm';

export const Form = () => {
  const { create } = useFirebase('things');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  const [values, handleInputChange, setValues] = useForm({
    nameItem: '',
    selectTime: '',
    lastDate: null,
  });

  const sendToFB = (e) => {
    e.preventDefault();
    const itemLength = values.nameItem.length;
    const selectLength = values.selectTime.length;

    if (itemLength && selectLength) {
      create({
        name: values.nameItem,
        time: values.selectTime,
        lastDate: null,
      });

      e.target.reset();

      setValues({
        nameItem: '',
        selectTime: '',
        lastDate: null,
      });
      setSuccess('Data was send success');
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
      return;
    }
    setError('Fill in all the blanks');
    setTimeout(() => {
      setError(null);
    }, 2000);
  };

  return (
    <div>
      <form onSubmit={sendToFB} className="form-item">
        <label htmlFor="fname">
          Name of item:
          <input type="text" name="nameItem" onChange={handleInputChange} />
        </label>
        <br />
        <div>
          <label className="form-radio-set">
            How soon are you likely to buy it again?
            <label>
              <input
                type="radio"
                name="selectTime"
                onChange={handleInputChange}
                value="7"
              />
              Soon (in the next 7 days)
            </label>
            <label>
              <input
                type="radio"
                name="selectTime"
                onChange={handleInputChange}
                value="14"
              />
              Kind of soon (in the next 14 days)
            </label>
            <label>
              <input
                type="radio"
                name="selectTime"
                onChange={handleInputChange}
                value="30"
              />
              Not soon (in the next 30 days)
            </label>
          </label>
        </div>

        <div>Last purchased date{values.lastDate}</div>
        <button type="submit">Send</button>
        {error && <div className="form-error-msn">{error}</div>}
        {success && <div className="form-success-msn">{success}</div>}
      </form>
    </div>
  );
};
