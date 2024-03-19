import React from 'react';

import { Form } from '../components/Form/Form';

import { useSignupUserMutation } from '../redux/contactsApi';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [addNewUser] = useSignupUserMutation();
  const navigate = useNavigate();

  const handleSubmit = data => {
    addNewUser(data)
      .unwrap()
      .then(res => {
        navigate('/login');
      });
  };

  return (
    <div>
      <Form formType={'register'} onSubmit={handleSubmit} />
    </div>
  );
};
