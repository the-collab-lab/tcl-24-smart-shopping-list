import React from 'react';
import { fb } from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Form } from './Form';

const Data = () => {
  const [value, loading, error] = useCollection(
    fb.firestore().collection('things'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

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

export default Data;
