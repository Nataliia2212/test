import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/userSlice';

export const PublicRoute = ({ children }) => {
  const location = useLocation();
  const loggedIn = useSelector(selectIsLoggedIn);

  if (loggedIn) {
    return <Navigate to={location.state?.from || '/'} replace={true} />;
  }
  return children;
};
