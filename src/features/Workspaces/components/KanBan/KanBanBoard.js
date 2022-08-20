import React from 'react';
import classNames from 'classnames/bind';
import styles from './kanbanBoard.module.scss';
import CardTask from '../Task/CardTask/CardTask';
import image1 from '../../../../assets/images/image1.jpg';
import { useDispatch } from 'react-redux';
import { showTaskDetail } from '../../../../redux/reducers/modalSlice';

const cx = classNames.bind(styles);

const KanBanBoard = () => {
  const dispatch = useDispatch();
  const handleShowTaskDetail = () => {
    dispatch(showTaskDetail());
  };
  const data = ['BACKLOG', 'SELECTED FOR DEVELOPMENT', 'IN PROGRESS', 'DONE'];
  const data2 = [1, 2, 3, 2, 3, 4, 2, 1];
  return (
    <div className={cx('wrapper')}>
      <div className={cx('path')}>
        <p>
          <span>Projects</span> / <span>singularity 1.0</span> /{' '}
          <span>Kanban Board</span>
        </p>
      </div>
      <h3 className={cx('title')}>Kanban board</h3>
      <div className={cx('board-filter')}>
        <div className={cx('input-search')}>
          <i className="bx bx-search"></i>

          <input type={cx('text')} />
        </div>
        <div className={cx('user')}>
          <img src={image1} alt="error" />
          <img src={image1} alt="error" />

          <img src={image1} alt="error" />
          <div className={cx('circle-img')}>
            <span>+5</span>
          </div>
        </div>
        <button>Only My Issues</button>
        <button>Recently Updated</button>
      </div>
      <div className={cx('board')}>
        {data.map((item, index) => (
          <div className={cx('boxTask')} key={index}>
            <p className={cx('taskType')}>{item}</p>
            {data2.map((i, j) => {
              if (index + 1 === i) {
                return (
                  <div onClick={handleShowTaskDetail} key={j}>
                    <CardTask />
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanBanBoard;
