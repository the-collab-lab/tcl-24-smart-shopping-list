import React, { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useFirebase } from '../../hooks/useFirebase';

import calculateEstimate from '../../lib/estimates.js';

import './list.css';

const List = () => {
  const token = localStorage.getItem('token');

  const { getAll, update } = useFirebase();

  const firebasePath = getAll()
    .doc(token)
    .collection('items')
    .orderBy('lastEstimate');

  const [value, loading, error] = useCollection(firebasePath);

  const [inputValue, setInputValue] = useState('');

  const handleCheck = (id, lastDate, time, times, lastEstimate) => {
    if (has24HoursPassed(lastDate) === false) {
      const currentDate = new Date();

      if (times >= 1) {
        let dayOne = new Date(lastDate.toDate());
        let result = currentDate - dayOne;
        let diffDay = Math.round(result / (1000 * 60 * 60 * 24));

        const num =
          times === 1
            ? calculateEstimate(time, time, times + 1)
            : calculateEstimate(lastEstimate, diffDay, times + 1);

        update(token, id, {
          lastDate: currentDate,
          times: times + 1,
          lastEstimate: num,
        });

        return;
      }

      update(token, id, {
        lastDate: currentDate,
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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const clearFilter = () => setInputValue('');

  const groups = (list) => {
    let listByGroups = [[], [], [], []];

    const today = new Date();

    list.forEach((element) => {
      if (element.data().lastEstimate < 7 && element.data().lastEstimate > 0)
        listByGroups[0].push(element);
      if (element.data().lastEstimate >= 7 && element.data().lastEstimate <= 30)
        listByGroups[1].push(element);
      if (element.data().lastEstimate > 30) listByGroups[2].push(element);
      if (
        element.data().lastEstimate === 0 &&
        today - element.data().lastDate > element.data().lastEstimate * 2
      )
        listByGroups[3].push(element);
    });

    console.log('listByGroups', listByGroups);

    return listByGroups;
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
        <>
          <input value={inputValue} onChange={handleInputChange} />
          {inputValue.length >= 1 && <button onClick={clearFilter}>X</button>}

          <ul>
            {groups(
              value.docs.filter((doc) => doc.data().name.includes(inputValue)),
            ).map((group, indexGroup) =>
              group.map((doc) => (
                <li key={doc.id} className={`group-${indexGroup}`}>
                  <input
                    type="checkbox"
                    checked={has24HoursPassed(doc.data().lastDate)}
                    onChange={() =>
                      handleCheck(
                        doc.id,
                        doc.data().lastDate,
                        doc.data().time,
                        doc.data().times,
                        doc.data().lastEstimate,
                      )
                    }
                  />
                  {doc.data().name}
                  {doc.data().lastEstimate}
                </li>
              )),
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default List;
