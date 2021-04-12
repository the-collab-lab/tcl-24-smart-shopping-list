import React, { useState } from 'react';
import { useFirebase } from '../../hooks/useFirebase';

export const Form = () => {
  const { create } = useFirebase('things');
  const [thing, setThing] = useState('');
  const sendToFB = (e) => {
    e.preventDefault();
    create({ name: thing });
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={sendToFB}>
        <label for="fname">
          Name of item:
          <input type="text" onChange={(e) => setThing(e.target.value)} />
        </label>
        <label>
          How soon are you likely to buy it again?
          <select name="" id="">
            <option value="#">Soon (in the next 7 days)</option>
            <option value="#">Kind of soon (in the next 14 days)</option>
            <option value="#">Not soon (in the next 30 days)</option>
          </select>
        </label>
        <div>Last purchased date</div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
