import React, { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './verifyAccount.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { verifyAccount } from '../../../../redux/action/authActions';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

const VerifyAccount = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState({
    codeErr: '',
  });

  const [code, setCode] = useState('');

  const token = useSelector((state) => state.auth.accessToken);

  const navigate = useNavigate();
  const handleChangeCode = (e) => {
    setCode(e.target.value);
    setError({ ...error, codeErr: '' });
  };
  const onVerifyAccount = async () => {
    console.log(code);

    try {
      if (!code) {
        setError({ ...error, codeErr: 'This field is required' });
      } else {
        const user = jwt_decode(token);
        console.log(jwt_decode(token));
        if (user.otp === Number(code)) {
          const verify = await dispatch(verifyAccount({ id: user.id }));
          if (verify.payload) {
            navigate('/home');
            toast.success('Successfully', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error('Verify failed', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          setError({ ...error, codeErr: 'incorrect code' });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={cx('wrapper')}>
      <ToastContainer />

      <i
        className={`bx bx-right-arrow-alt ${cx('back-icon')}`}
        onClick={() => navigate('/register')}
      ></i>
      <h2>VERIFY</h2>
      <p>
        The verification code has just been sent to your email. Please enter the
        code to register an account
      </p>
      <div className={cx('inputFields', error.codeErr && 'error')}>
        <label htmlFor="Code">Code:</label>
        <input
          type="text"
          name="Code"
          id="Code"
          value={code}
          onChange={handleChangeCode}
          placeholder="Enter the code"
        />
        {error.codeErr ? <span>{error.codeErr}</span> : null}
        <p className={cx('btn-verify')} onClick={onVerifyAccount}>
          Verify
        </p>
      </div>
    </div>
  );
};

export default VerifyAccount;
