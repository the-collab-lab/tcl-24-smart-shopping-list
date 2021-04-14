import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Form } from '../Form/Form';
import { useFirebase } from '../../hooks/useFirebase';

const List = () => {
  const token = localStorage.getItem('token');

  const { getAll } = useFirebase(token);

  const [value, loading, error] = useCollection(getAll());

  return (
    <div>
      <Form />
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
