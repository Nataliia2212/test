import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import s from './Form.module.css';

export const Form = ({ formType, onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  const submit = data => {
    onSubmit(data);
    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(submit)}>
      {formType === 'register' && (
        <label className={s.label}>
          Name
          <input
            className={s.input}
            {...register('name', {
              required: { value: true, message: 'Field is required' },
            })}
            name="name"
          />
        </label>
      )}
      <label className={s.label}>
        Email
        <input
          className={s.input}
          {...register('email', {
            required: { value: true, message: 'Field is required' },
          })}
          name="email"
        />
      </label>
      <label className={s.label}>
        Password
        <input
          className={s.input}
          {...register('password', {
            required: { value: true, message: 'Field is required' },
          })}
          name="password"
        />
      </label>
      <button className={s.button}>
        {formType === 'register' ? 'Register' : 'Login'}
      </button>
      <p className={s.link}>
        {formType === 'register'
          ? 'You already have account?'
          : 'You do not have account?'}
        {formType === 'register' ? (
          <Link to="/login">Sign in!</Link>
        ) : (
          <Link to="/register">Sign up!</Link>
        )}
      </p>
    </form>
  );
};
