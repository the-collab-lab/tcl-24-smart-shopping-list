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
        <input type="text" onChange={(e) => setThing(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
