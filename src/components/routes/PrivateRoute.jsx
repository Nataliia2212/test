import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/userSlice';

export const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const loggedIn = useSelector(selectIsLoggedIn);

  if (loggedIn) {
    return children;
  }

  return <Navigate state={{ from: location }} to="/login" />;
};
