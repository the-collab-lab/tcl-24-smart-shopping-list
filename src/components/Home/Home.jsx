import React from 'react';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useCollection } from 'react-firebase-hooks/firestore';
import { fb } from '../../lib/firebase';

import { useFirebase } from '../../hooks/useFirebase.js';

import { Redirect, useHistory } from 'react-router-dom';
import getToken from '../../lib/tokens';

const Home = () => {
  const userToken = localStorage.getItem('token');

  const [values, handleInputChange, setValues] = useForm({
    token: '',
  });

  const [msn, setMsn] = useState('');
  const [load, setLoad] = useState('');
  const { getAll } = useFirebase();

  function looking() {
    setLoad('loading...');
    var docRef = getAll().doc(values.token);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
          setMsn('The list is found');
          setLoad('');
          // setTime();
        } else {
          console.log('No such document!');
          setMsn('The list does not found');
          setLoad('');
          // setTime();
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }

  // const setTime = () => {
  //   setTimeout(() => {
  //     setMsn('');
  //   }, 1000);

  // }

  const history = useHistory();

  const handleClick = () => {
    const createdToken = getToken();

    localStorage.setItem('token', createdToken);

    history.push('/list');
  };

  // const handleChange = ({target}) => {
  //   // console.log('leyendo...');
  //   setInputToken(target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    looking();
    setValues({
      token: '',
    });
    e.target.reset();

    // console.log(inputToken);
  };

  fb.firestore()
    .collection('lists')
    // .where(values.token)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        console.log('running');
      });
    })
    .catch((error) => {
      console.log('Error getting documents: ', error);
    });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Write Your Token
          <input type="text" name="token" onChange={handleInputChange} />
          <button type="submit">Search</button>
        </label>
      </form>
      {msn && <p>{msn}</p>}
      {load && <p>{load}</p>}
      <button onClick={handleClick}>New List</button>
    </div>
  );
};

export default Home;
