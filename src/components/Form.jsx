import React, { useState } from 'react';
import { fb } from './../lib/firebase';

export const Form = () => {
  const [thing, setThing] = useState('');
  const sendToFB = () => {
    console.log(thing);
    fb.firestore()
      .collection('things')
      .add({ name: thing })
      .then()
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" onChange={(e) => setThing(e.target.value)} />
        <button onClick={() => sendToFB()}>Send</button>
      </form>
    </div>
  );
};
