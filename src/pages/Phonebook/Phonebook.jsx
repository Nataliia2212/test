import React from 'react';
import { UserMenu } from '../../components/UserMenu/UserMenu';
import { selectIsLoggedIn } from '../../redux/userSlice';
import { useSelector } from 'react-redux';

export const Phonebook = () => {
  const loggedIn = useSelector(selectIsLoggedIn);

  return (
    <div>
      <h1>Phonebook</h1>
      {loggedIn && (
        <>
          <img
            src="https://www.svgrepo.com/show/44434/brunette-female-woman-long-hair.svg"
            alt="avatar"
            width={250}
          />
          <UserMenu />
        </>
      )}
    </div>
  );
};
