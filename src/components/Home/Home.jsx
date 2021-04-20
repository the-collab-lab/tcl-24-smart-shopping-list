import React from 'react';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';

import { Redirect, useHistory } from 'react-router-dom';
import getToken from '../../lib/tokens';

const Home = () => {
  const userToken = localStorage.getItem('token');

  // const [inputToken, setInputToken] = useState('');

  const history = useHistory();

  const [values, handleInputChange, setValues] = useForm({
    token: '',
  });

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
    setValues({
      token: '',
    });
    e.target.reset();

    // console.log(inputToken);
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

      <button onClick={handleClick}>New List</button>

      {/* {userToken ? (
        <Redirect to="/list" />
      ) : (
      )} */}
    </div>
  );
};

export default Home;
