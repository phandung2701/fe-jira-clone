import React from 'react';
import classNames from 'classnames/bind';
import styles from './loading.module.scss';

const cx = classNames.bind(styles);

const LoadingSpinner = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('lds-roller')}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
