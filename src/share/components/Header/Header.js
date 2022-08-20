import React from 'react';
import classNames from 'classnames/bind';
import styles from './header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLogout } from '../../../redux/reducers/authSlice';

const cx = classNames.bind(styles);

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.accessToken);
  const success = useSelector((state) => state.auth.success);

  const handleShowForm = (display) => {
    navigate(display);
  };
  const handleLogout = () => {
    dispatch(isLogout(''));
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header-logo')}>
        <img
          onClick={() => navigate('/')}
          src="https://wac-cdn.atlassian.com/dam/jcr:e348b562-4152-4cdc-8a55-3d297e509cc8/Jira%20Software-blue.svg?cdnVersion=478"
          alt="jira"
        />
      </div>
      <ul className={cx('header-content')}>
        <li>Features</li>
        <li>Product guide</li>
        <li>Pricing</li>
        <li onClick={() => navigate('/project')}>Project</li>
      </ul>
      {!token ? (
        <div className={cx('header-user')}>
          <p onClick={() => handleShowForm('/login')}>Login</p>
          <p onClick={() => handleShowForm('/register')}>Register</p>
        </div>
      ) : (
        <div className={cx('header-user-login')} onClick={handleLogout}>
          <i className="bx bx-user"></i>
          <span>user</span>
        </div>
      )}
    </div>
  );
};

export default Header;
