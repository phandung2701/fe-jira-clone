import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './boxSearchIssue.module.scss';
import { closeModalIssues } from '../../../../redux/reducers/modalSlice';

const cx = classNames.bind(styles);

const BoxSearchIssue = () => {
  const typetask = [
    {
      name: 'task',
      icon: 'bx bxs-checkbox-checked',
    },
    {
      name: 'bug',
      icon: 'bx bxs-message-error',
    },
    {
      name: 'task',
      icon: 'bx bxs-bookmark',
    },
  ];
  const modalRef = useRef();
  const closeRef = useRef();
  const modalIssues = useSelector((state) => state.modal.modalIssues);
  const dispatch = useDispatch();
  const handleCloseSearchIssues = (e) => {
    e.stopPropagation();
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(closeModalIssues());
    } else if (closeRef.current.contains(e.target)) {
      dispatch(closeModalIssues());
    }
  };
  return (
    <>
      {modalIssues ? (
        <div className={cx('wrapper')} onClick={handleCloseSearchIssues}>
          <div className={cx('container')} ref={modalRef}>
            <div
              className={cx('box-close')}
              ref={closeRef}
              onClick={handleCloseSearchIssues}
            >
              <i className="bx bx-x"></i>
            </div>
            <div className={cx('input-search')}>
              <i className="bx bx-search"></i>
              <input
                type="text"
                name="seacrh-issue"
                id="seacrh-issue"
                placeholder="Search issues by summary, description..."
              />
            </div>
            <div className={cx('recent-issues')}>
              <p className={cx('title')}>recent issues</p>
              <div className={cx('list-issues')}>
                <div className={cx('list-issue-item')}>
                  <i className={`bx bxs-message-error ${cx('bug')}`}></i>
                  <div className={cx('content')}>
                    <p>
                      Try dragging issues to different columns to transition
                      their status.
                    </p>
                    <p>STORY-ID</p>
                  </div>
                </div>
                <div className={cx('list-issue-item')}>
                  <i className={`bx bxs-checkbox-checked ${cx('task')}`}></i>
                  <div className={cx('content')}>
                    <p>
                      Try dragging issues to different columns to transition
                      their status.
                    </p>
                    <p>STORY-ID</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BoxSearchIssue;
