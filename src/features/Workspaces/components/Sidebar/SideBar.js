import React from 'react';
import classNames from 'classnames/bind';
import styles from './sidebar.module.scss';
import { SiJirasoftware } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  showCreateTask,
  showModalIssues,
} from '../../../../redux/reducers/modalSlice';

const cx = classNames.bind(styles);

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRedirectHome = () => {
    navigate('/');
  };
  const handleShowModalSeacrh = () => {
    dispatch(showModalIssues());
  };
  const handleShowCreateTask = () => {
    dispatch(showCreateTask());
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('logo')}>
        <SiJirasoftware
          className={cx('logo-icon')}
          onClick={handleRedirectHome}
        />
      </div>
      <div className={cx('search-task')} onClick={handleShowModalSeacrh}>
        <i className="bx bx-search"></i>
        <span>Search issues</span>
      </div>
      <div className={cx('create-task')} onClick={handleShowCreateTask}>
        <i className="bx bx-plus"></i>
        <span>Create Issue</span>
      </div>
      <div className={cx('question')}>
        <i className="bx bx-question-mark"></i>
        <span>About</span>
      </div>
    </div>
  );
};

export default SideBar;
