import React from 'react';
import { useSelector } from 'react-redux';

import ContactItem from '../ContactItem/ContactItem';

import { useGetContactsQuery } from '../../redux/contactsApi';
import { selectFilter } from './../../redux/filterSlice';
import css from './ContactsList.module.css';

export default function ContactsList() {
  const { data } = useGetContactsQuery();
  const filter = useSelector(selectFilter);

  const getFilteredData = () => {
    return data?.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filterData = getFilteredData();
  return (
    <ul className={css.list}>
      {filterData?.map(user => (
        <ContactItem key={user.id} {...user} />
      ))}
    </ul>
  );
}
