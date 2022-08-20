import React from 'react';
import classNames from 'classnames/bind';
import styles from './homeLayout.module.scss';
import Header from '../../share/components/Header/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const cx = classNames.bind(styles);

const HomeLayout = () => {
  return (
    <div className={cx('wrapper')}>
      <ToastContainer />
      <div className={cx('header')}>
        <Header />
      </div>
      <div className={cx('main')}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
