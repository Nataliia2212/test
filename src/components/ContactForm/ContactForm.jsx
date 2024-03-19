import React, { useState } from 'react';

import {
  useAddNewContactMutation,
  useGetContactsQuery,
} from '../../redux/contactsApi';
import css from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { data } = useGetContactsQuery();
  const [addNewContact] = useAddNewContactMutation();

  const handleSubmit = e => {
    e.preventDefault();

    if (data?.every(contact => contact.name !== name)) {
      const newContact = {
        name,
        number,
        createdAt: new Date().toLocaleDateString(),
      };
      addNewContact(newContact);
      setName('');
      setNumber('');
    } else {
      return alert(`${name} is already in contacts`);
    }
  };

  const handleChangeInput = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        return setName(value);
      case 'number':
        return setNumber(value);
      default:
        return name;
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name:
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChangeInput}
          required
        />
      </label>
      <label className={css.label}>
        Number:
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChangeInput}
          required
        />
      </label>
      <button className={css.button}>Add contact</button>
    </form>
  );
}
