import React from 'react';
import notfound from '../../../assets/images/6M513.png';

import classNames from 'classnames/bind';
import styles from './notFound.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <img src={notfound} alt="" />
        <p onClick={() => navigate('/')}>Go Home</p>
      </div>
    </div>
  );
};

export default NotFound;
