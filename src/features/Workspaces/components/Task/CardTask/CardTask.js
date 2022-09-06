import React from 'react';
import classNames from 'classnames/bind';
import styles from './cardTask.module.scss';
import { useSelector } from 'react-redux';
import { typetask, priorityData } from '../../../../../share/constants/task';
import { IoWarning } from 'react-icons/io5';
import useDate from '../../../../../hook/useDate';

const cx = classNames.bind(styles);

const CardTask = ({ task }) => {
  const { dateDiff } = useDate();

  const userList = useSelector((state) => state.auth.userList);
  return (
    <div
      className={cx(
        'wrapper',
        Number(
          dateDiff.isHours(
            new Date(task.createdAt).toLocaleString(),
            new Date().toLocaleString()
          )
        ) > Number(task.duedate) &&
          task.status !== 'DONE' &&
          'duedate'
      )}
    >
      <div className={cx('title')}>
        <p>{task.title}</p>
      </div>
      <div className={cx('content')}>
        <div className={cx('priority')}>
          {Number(
            dateDiff.isHours(
              new Date(task.createdAt).toLocaleString(),
              new Date().toLocaleString()
            )
          ) > Number(task.duedate) &&
            task.status !== 'DONE' && <IoWarning className={cx('warning')} />}
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
