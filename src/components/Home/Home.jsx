import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import getToken from '../../lib/tokens';

const Home = () => {
  const userToken = localStorage.getItem('token');

  const history = useHistory();

  const handleClick = () => {
    const createdToken = getToken();

    localStorage.setItem('token', createdToken);

    history.push('/list');
  };

  return (
    <div>
      {userToken ? (
        <Redirect to="/list" />
      ) : (
        <button onClick={handleClick}>New List</button>
      )}
    </div>
  );
};

export default Home;
