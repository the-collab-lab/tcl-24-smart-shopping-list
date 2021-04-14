import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ children, ...props }) => {
  const gotToken = localStorage.getItem('token');

  return (
    <Route
      {...props}
      render={() => (gotToken ? children : <Redirect to="/" />)}
    />
  );
};

export default ProtectedRoute;
