import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

import { useFirebase } from '../../hooks/useFirebase';

const List = () => {
  const token = localStorage.getItem('token');

  const { getAll } = useFirebase();

  const firebasePath = getAll().doc(token).collection('data');

  const [value, loading, error] = useCollection(firebasePath);

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <ul>
          {value.docs.map((doc) => (
            <li key={doc.id}>{doc.data().name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default List;
