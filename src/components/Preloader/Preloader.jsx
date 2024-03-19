import React from 'react';
import { Hourglass } from 'react-loader-spinner';
import s from './Preloader.module.css';
export const Preloader = () => {
  return (
    <div className={s.wrapper}>
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
      />
      <h1>Loading...</h1>
    </div>
  );
};
