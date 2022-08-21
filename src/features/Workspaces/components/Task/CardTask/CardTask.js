import React from 'react';
import classNames from 'classnames/bind';
import styles from './cardTask.module.scss';
import { useSelector } from 'react-redux';
import { typetask, priorityData } from '../../../../../share/constants/task';

const cx = classNames.bind(styles);

const CardTask = ({ task }) => {
  const userList = useSelector((state) => state.auth.userList);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <p>{task.title}</p>
      </div>
      <div className={cx('content')}>
        <div className={cx('priority')}>
          {typetask.map((item) => {
            if (item.name === task.type) {
              return (
                <i
                  key={item.id}
                  className={`${item.icon} ${cx(item.name)}`}
                ></i>
              );
            }
          })}
          {priorityData.map((item) => {
            if (item.name === task.priority) {
              return (
                <i
                  key={item.id}
                  className={`${item.icon} ${cx(item.name)}`}
                ></i>
              );
            }
          })}
        </div>
        <div className={cx('assignees')}>
          {task.assignees.length > 0 &&
            userList.map((item) => {
              if (task.assignees.includes(item.id)) {
                return (
                  <i
                    key={item.id}
                    className={item.icon}
                    style={{ color: `${item.color}` }}
                  ></i>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default CardTask;
