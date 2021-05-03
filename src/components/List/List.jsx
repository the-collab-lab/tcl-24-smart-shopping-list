import React from 'react';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useFirebase } from '../../hooks/useFirebase';

import calculateEstimate from '../../lib/estimates.js';

const List = () => {
  const token = localStorage.getItem('token');

  const { getAll, update } = useFirebase();

  // const [times, setTimes] = useState(0)

  // calculateEstimate();

  console.log(calculateEstimate(14, 20, 2));

  const firebasePath = getAll().doc(token).collection('items');

  const [value, loading, error] = useCollection(firebasePath);

  const handleCheck = (id, lastDate, times) => {
    if (has24HoursPassed(lastDate) === false) {
      const date = new Date();
      update(token, id, { lastDate: date, times: times + 1 });
    }
  };

  const has24HoursPassed = (date) => {
    if (date) {
      const currentDate = new Date();
      const itemDate = new Date(date.toDate());
      itemDate.setDate(itemDate.getDate() + 1);
      // itemDate.setMinutes(itemDate.getMinutes() + 2); // In case you wanna test it

      return !(currentDate >= itemDate);
    }

    return false;
  };
  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}

      {value?.empty && (
        <p>
          There are not any item in this list yet. You can add items with the
          "Add Item" button at the bottom!
        </p>
      )}

      {value && !value.empty && (
        <ul>
          {value.docs.map((doc) => (
            <li key={doc.id}>
              <input
                type="checkbox"
                checked={has24HoursPassed(doc.data().lastDate)}
                onChange={() =>
                  handleCheck(doc.id, doc.data().lastDate, doc.data().times)
                }
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
