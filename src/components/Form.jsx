import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';

export const Form = () => {
  const context = useContext(DataContext);
  const { create } = context;
  const [thing, setThing] = useState('');
  const sendToFB = (e) => {
    e.preventDefault();
    console.log(thing);
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
