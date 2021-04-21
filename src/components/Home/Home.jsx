import React from 'react';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useFirebase } from '../../hooks/useFirebase.js';
import { useHistory } from 'react-router-dom';
import getToken from '../../lib/tokens';

const Home = () => {
  const [values, handleInputChange, setValues] = useForm({
    token: '',
  });

  const [msn, setMsn] = useState('');
  const [error, setError] = useState('');
  const [load, setLoad] = useState('');
  const { getAll } = useFirebase();

  function searching() {
    setLoad('searching...');

    var docRef = getAll().doc(values.token);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setMsn('The list is found');
          setLoad('');
          localStorage.setItem('token', values.token);
          history.push('/list');
        } else {
          setMsn('The list is not found');
          setLoad('');
        }
      })
      .catch((error) => {
        setError(`Error getting document: ${error}`);
      });
  }

  const history = useHistory();

  const handleClick = () => {
    const createdToken = getToken();
    localStorage.setItem('token', createdToken);
    history.push('/list');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searching();
    setValues({
      token: '',
    });
    e.target.reset();
  };

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
      {error && <p>{error}</p>}
      {load && <p>{load}</p>}
      <button onClick={handleClick}>New List</button>
    </div>
  );
};

export default Home;
