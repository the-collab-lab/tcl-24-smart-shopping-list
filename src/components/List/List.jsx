import React from 'react';
import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useFirebase } from '../../hooks/useFirebase';

import calculateEstimate from '../../lib/estimates.js';

const List = () => {
  const token = localStorage.getItem('token');

  const { getAll, update } = useFirebase();

  const firebasePath = getAll().doc(token).collection('items');

  const [value, loading, error] = useCollection(firebasePath);

  const handleCheck = (id, lastDate, time, prevDate, latestInterval, times) => {
    if (has24HoursPassed(lastDate) === false) {
      const date = new Date();

      if (times >= 1) {
        const dayOne = new Date(prevDate.toDate());
        const dayTwo = new Date(lastDate.toDate());
        const result = dayTwo - dayOne;
        var diffDay = Math.round(result / (1000 * 60 * 60 * 24));

        prevDate = lastDate;
        lastDate = date;

        const num = calculateEstimate(time, latestInterval, times);

        update(token, id, {
          lastDate: lastDate,
          prevDate: prevDate,
          times: times + 1,
          latestInterval: diffDay,
          estimatedNum: num,
        });

        return;
      }

      update(token, id, {
        lastDate: date,
        prevDate: lastDate,
        times: times + 1,
      });
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
                  handleCheck(
                    doc.id,
                    doc.data().lastDate,
                    doc.data().time,
                    doc.data().prevDate,
                    doc.data().latestInterval,
                    doc.data().times,
                  )
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

// lastDate.getTime();
