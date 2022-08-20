import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './register.module.scss';
import { useDispatch } from 'react-redux';
import { register } from '../../../../redux/action/authActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowLogin = () => {
    navigate('/login');
  };
  const [error, setError] = useState({
    emailErr: '',
    passwordErr: '',
    confirmPasswordErr: '',
    codeErr: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setError({ ...error, emailErr: '' });
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setError({ ...error, passwordErr: '' });
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setError({ ...error, confirmPasswordErr: '' });
  };
  const onSubmit = async () => {
    const filter =
      //eslint-disable-next-line
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!email && !password && !confirmPassword) {
      setError({
        passwordErr: 'This field is required',
        emailErr: 'This field is required',
        confirmPasswordErr: 'This field is required',
      });
    } else if (!email) {
      if (password === confirmPassword) {
        setError({ ...error, emailErr: 'This field is required' });
      } else {
        setError({
          ...error,
          emailErr: 'This field is required',
          confirmPasswordErr: 'the must be password above',
        });
      }
    } else if (!password) {
      if (!filter.test(email)) {
        setError({
          emailErr: 'This field must be email',
          passwordErr: 'This field is required',
        });
      } else {
        setError({ ...error, passwordErr: 'This field is required' });
      }
    } else if (!confirmPassword) {
      setError({
        ...error,
        confirmPasswordErr: 'This field is required',
      });
    } else {
      if (!filter.test(email)) {
        setError({ ...error, emailErr: 'This field must be email' });
      } else if (!(password === confirmPassword)) {
        setError({
          ...error,
          confirmPasswordErr: 'the must be password above',
        });
      } else {
        const user = {
          email,
          password,
          confirmPassword,
        };
        const data = await dispatch(register(user));
        if (data.payload) {
          navigate('/verify-account');
        } else {
          setError({
            ...error,
            emailErr: 'Email already exists',
          });
          toast.error('Registration failed', {
            position: 'top-right',
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
      <h2>REGISTER</h2>
      <div className={cx('inputFields', error.emailErr && 'error')}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="VD: Example@gmail.com"
          value={email}
          onChange={handleChangeEmail}
        />
        {error.emailErr ? <span>{error.emailErr}</span> : null}
      </div>
      <div className={cx('inputFields', error.passwordErr && 'error')}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Create a password"
          value={password}
          onChange={handleChangePassword}
        />
        {error.passwordErr ? <span>{error.passwordErr}</span> : null}
      </div>
      <div className={cx('inputFields', error.confirmPasswordErr && 'error')}>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm a  password"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
        />
        {error.confirmPasswordErr ? (
          <span>{error.confirmPasswordErr}</span>
        ) : null}
      </div>
      <p className={cx('submit')} onClick={onSubmit}>
        Register now
      </p>
      <div className={cx('hints')}>
        <p>
          Already have an account?{' '}
          <span onClick={handleShowLogin}>Login now</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
