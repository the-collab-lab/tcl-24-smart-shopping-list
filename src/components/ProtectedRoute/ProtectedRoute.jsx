import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, ...props }) => {
  const token = localStorage.getItem('token');

  return (
    <Route {...props} render={() => (token ? children : <Redirect to="/" />)} />
  );
};

export default ProtectedRoute;
