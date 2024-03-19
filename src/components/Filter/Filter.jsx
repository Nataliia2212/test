import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectFilter } from '../../redux/filterSlice';
import { filterContacts } from '../../redux/filterSlice';
import css from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();

  const filter = useSelector(selectFilter);

  const handleChangeInput = e => {
    dispatch(filterContacts(e.target.value));
  };

  return (
    <div className={css.wrap}>
      <p>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={filter}
        name="filter"
        onChange={handleChangeInput}
      />
    </div>
  );
}
