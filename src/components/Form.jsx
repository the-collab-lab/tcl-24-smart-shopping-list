import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

export const Form = () => {
  const { create } = useContext(DataContext);
  const [thing, setThing] = useState('');
  const sendToFB = (e) => {
    e.preventDefault();
    create({ name: thing });
    e.target.reset();
  };

  return (
    <div>
      <form onSubmit={sendToFB}>
        <input type="text" onChange={(e) => setThing(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
