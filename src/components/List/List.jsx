import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useFirebase } from '../../hooks/useFirebase';

const List = () => {
  const token = localStorage.getItem('token');

  const { getAll } = useFirebase();

  const firebasePath = getAll().doc(token).collection('items');

  const [value, loading, error] = useCollection(firebasePath);

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <ul>
          {value.docs.map((doc) => (
            <li key={doc.id}>
              <input
                type="checkbox"
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              {doc.data().name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
