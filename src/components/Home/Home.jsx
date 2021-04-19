import React from 'react';
import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import getToken from '../../lib/tokens';

const Home = () => {
  const userToken = localStorage.getItem('token');

  const [inputToken, setInputToken] = useState('');

  const history = useHistory();

  const handleClick = () => {
    const createdToken = getToken();

    localStorage.setItem('token', createdToken);

    history.push('/list');
  };

  const handleChange = (e) => {
    // console.log('leyendo...');
    setInputToken(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputToken);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <input type="text" onChange={(e) => handleChange(e)} />
          <button type="submit">Search</button>
        </label>
      </form>

      <button onClick={handleClick}>New List</button>

      {/* {userToken ? (
        <Redirect to="/list" />
      ) : (
      )} */}
    </div>
  );
};

export default Home;
