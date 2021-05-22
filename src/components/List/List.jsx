import React, { useState, useEffect, useRef } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useFirebase } from '../../hooks/useFirebase';
import useNotification from '../../hooks/useNotification';

import calculateEstimate from '../../lib/estimates.js';
import Loader from '../Loader/Loader';

import { Input } from '../Style/Input.Style';

import {
  ItemContainer,
  ListContainer,
  ItemName,
  DeleteButton,
  UnorderedList,
  FilterContainer,
  Main,
  Additional,
  LastPurchase,
} from './List.Style';

const List = () => {
  const token = localStorage.getItem('token');

  const { getAll, update, remove } = useFirebase();

  const firebasePath = getAll()
    .doc(token)
    .collection('items')
    .orderBy('lastEstimate')
    .orderBy('name');

  const [value, loading, error] = useCollection(firebasePath);

  const {
    success,
    error: errorDelete,
    setSuccess,
    setError,
    load,
    setLoad,
  } = useNotification();

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

  const timeoutId = useRef();

  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('are you sure to delete the item?')) {
      setLoad('Removing element...');
      remove(token, id)
        .then(() => {
          setLoad('');
          setSuccess('Element successfully deleted!');
        })
        .catch((err) => setError('Error removing element: ', err));
    }
    timeoutId.current = setTimeout(() => {
      setSuccess('');
      setError('');
    }, 3000);
  };

  const groups = (list) => {
    const groupsDictionary = {
      Soon: [],
      'Kind of Soon': [],
      'Not Soon': [],
      Inactive: [],
    };

    const today = new Date();

    list.forEach((element) => {
      const { lastDate, lastEstimate } = element.data();

      const isInactive = lastDate
        ? Math.round(
            (today - new Date(lastDate.toDate())) / (1000 * 60 * 60 * 24),
          ) >=
          lastEstimate * 2
        : true;
      if (lastEstimate === 0 || isInactive)
        groupsDictionary['Inactive'].push(element);
      if (lastEstimate < 7 && lastEstimate > 0 && !isInactive)
        groupsDictionary['Soon'].push(element);
      if (lastEstimate >= 7 && lastEstimate <= 30 && !isInactive)
        groupsDictionary['Kind of Soon'].push(element);
      if (lastEstimate > 30 && !isInactive)
        groupsDictionary['Not Soon'].push(element);
    });

    const listByGroups = Object.entries(groupsDictionary);

    return listByGroups;
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const convertDate = (currentDate) => {
    const dateOnly = currentDate.split('T');
    const dateArray = dateOnly[0].split('-');
    console.log(dateArray[0].split('"'));

    const constructing = `${months[dateArray[1] - 1]} ${dateArray[2]} of ${
      dateArray[0].split('"')[1]
    }`;

    return constructing;
  };

  return (
    <ListContainer isLoading={loading}>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <Loader />}

      {value?.empty && (
        <p>
          There aren't any items in this list yet. You can add items with the
          "Add Item" button at the bottom!
        </p>
      )}

      {value && !value.empty && (
        <>
          <FilterContainer>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search"
            />
            {inputValue.length >= 1 && (
              <button onClick={clearFilter}>
                <i class="fas fa-backspace"></i>
                {/* <i class="fas fa-times"></i> */}
              </button>
            )}
          </FilterContainer>

          {load && <p>{load}</p>}
          {errorDelete && <p>{errorDelete}</p>}
          {success && <p>{success}</p>}

          <UnorderedList>
            {groups(
              value.docs.filter((doc) => doc.data().name.includes(inputValue)),
            ).map(([key, group], indexGroup) =>
              group.map((doc) => (
                <li
                  key={doc.id}
                  // className={`group-${indexGroup}`}
                  aria-label={key}
                >
                  <ItemContainer purchase={key}>
                    <Main>
                      <DeleteButton
                        onClick={() => handleDelete(doc.id)}
                        aria-label="Delete Item"
                      >
                        <i className="fas fa-trash fa-2x"></i>
                      </DeleteButton>
                      <label>
                        <ItemName>{doc.data().name}</ItemName>
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
                      </label>
                    </Main>
                    <Additional>
                      {doc.data().lastDate && (
                        <LastPurchase>
                          Last purchase:
                          {convertDate(
                            JSON.stringify(doc.data().lastDate.toDate()),
                          )}
                        </LastPurchase>
                      )}
                    </Additional>
                    {/* in case you wanna test it */}
                    {/* {doc.data().lastEstimate} */}
                  </ItemContainer>
                </li>
              )),
            )}
          </UnorderedList>
        </>
      )}
    </ListContainer>
  );
};

export default List;
