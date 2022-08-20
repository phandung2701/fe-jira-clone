import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './login.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '../../../../redux/action/authActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

const Login = () => {
  const [error, setError] = useState({ emailErr: '', passwordErr: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowRegister = () => {
    navigate('/register');
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setError({ ...error, emailErr: '' });
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setError({ ...error, passwordErr: '' });
  };
  const onSubmit = async () => {
    const filter =
      //eslint-disable-next-line
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!email && !password) {
      setError({
        passwordErr: 'This field is required',
        emailErr: 'This field is required',
      });
    } else if (!email) {
      setError({ ...error, emailErr: 'This field is required' });
    } else if (!password) {
      if (!filter.test(email)) {
        setError({
          emailErr: 'This field must be email',
          passwordErr: 'This field is required',
        });
      } else {
        setError({ ...error, passwordErr: 'This field is required' });
      }
    } else {
      if (!filter.test(email)) {
        setError({ ...error, emailErr: 'This field must be email' });
      } else {
        const user = {
          email,
          password,
        };

        const test = await dispatch(login(user));

        if (!test.payload) {
          toast.error('incorrect email or password', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          navigate('/home');
          toast.success('Logged in successfully', {
            position: 'top-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  };
  return (
    <div className={cx('wrapper')}>
      <h2>LOGIN</h2>
      <div className={cx('inputFields', error.emailErr && 'error')}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChangeEmail}
          placeholder="vd: example@gmail.com"
        />
        {error.emailErr ? <span>{error.emailErr}</span> : null}
      </div>
      <div className={cx('inputFields', error.passwordErr && 'error')}>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="enter your password"
        />
        {error.passwordErr ? <span>{error.passwordErr}</span> : null}
      </div>
      <p className={cx('submit')} onClick={onSubmit}>
        Login now
      </p>
      <div className={cx('hints')}>
        <p>
          Don't have an account ?
          <span onClick={handleShowRegister}>Register now</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
