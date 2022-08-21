import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../../api/userRequest';
import useAxios from '../../../hook/useAxios';
import { setUserList } from '../../../redux/reducers/authSlice';

const cx = classNames.bind(styles);

const Home = () => {
  const axiosToken = useAxios();
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  /* eslint-disable */
  useEffect(() => {
    if (!token) {
      return;
    } else {
      const fetchData = async () => {
        const data = await getUserList(axiosToken);
        dispatch(setUserList(data));
      };
      fetchData();
    }
  }, []);

  return (
    <div className={cx('container')}>
      <div className={cx('container-left')}>
        <div className={cx('heading-text')}>
          <h1>Move fast, stay aligned, and build better - together</h1>
          <p>The #1 software development tool used by agile teams</p>
        </div>
        <div className={cx('link-btn')}>
          <p>Get it free</p>
        </div>
      </div>
      <div className={cx('container-right')}>
        <div className={cx('image-workflow')}>
          <img
            src="https://wac-cdn.atlassian.com/dam/jcr:4ddaea11-b00e-4546-8241-25f45689fed6/hero-illustration.png?cdnVersion=478"
            alt="workflow"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
