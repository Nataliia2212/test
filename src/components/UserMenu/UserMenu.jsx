import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogoutUserMutation } from '../../redux/contactsApi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import s from './UserMenu.module.css';

export const UserMenu = () => {
  const [logout] = useLogoutUserMutation();
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(res => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  };

  return (
    <div className={s.wraper}>
      <div>{user.email}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
