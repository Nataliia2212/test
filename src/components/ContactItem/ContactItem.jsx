import React from 'react';

import { useDeleteContactMutation } from '../../redux/contactsApi';
import css from './ContactItem.module.css';

export default function ContactItem({ id, name, number }) {
  const [deleteContact] = useDeleteContactMutation();

  return (
    <li className={css.item}>
      {name}: {number}
      <button className={css.button} onClick={() => deleteContact(id)}>
        Delete
      </button>
    </li>
  );
}
