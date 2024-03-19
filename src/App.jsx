import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Phonebook, Login, Contacts, Register } from './pages/index';
import { Preloader, PrivateRoute, PublicRoute } from './components';
import Layout from './components/Layout/Layout';

import { selectIsRefresh, selectToken } from './redux/userSlice';
import { useCurrentUserQuery } from './redux/contactsApi';

export default function App() {
  const token = useSelector(selectToken);
  const skip = !token;
  const isRefresh = useSelector(selectIsRefresh);

  useCurrentUserQuery('', { skip });

  return isRefresh ? (
    <Preloader />
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Phonebook />} />
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="contacts"
            element={
              <PrivateRoute>
                <Contacts />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
