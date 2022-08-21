import React from 'react';
import classNames from 'classnames/bind';
import styles from './cardTask.module.scss';
import image1 from '../../../../../assets/images/image1.jpg';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const typetask = [
  {
    id: 1,
    name: 'Task',
    icon: 'bx bxs-checkbox-checked',
  },
  {
    id: 2,
    name: 'Bug',
    icon: 'bx bxs-message-error',
  },
  {
    id: 3,
    name: 'Story',
    icon: 'bx bxs-bookmark',
  },
];

const priorityData = [
  {
    id: 1,
    name: 'Highest',
    icon: 'bx bx-up-arrow-alt',
    color: '#ce323a',
  },
  {
    id: 2,
    name: 'High',
    icon: 'bx bx-up-arrow-alt',
    color: '#e94b4c',
  },
  {
    id: 3,
    name: 'Medium',
    icon: 'bx bx-up-arrow-alt',
    color: '#e98237',
  },
  {
    id: 4,
    name: 'Low',
    icon: 'bx bx-down-arrow-alt',
    color: '#58a65b',
  },
  {
    id: 5,
    name: 'Lowest',
    icon: 'bx bx-down-arrow-alt',
    color: '#5aa75d',
  },
];
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
              return <i className={`${item.icon} ${cx(item.name)}`}></i>;
            }
          })}
          {priorityData.map((item) => {
            if (item.name === task.priority) {
              return <i className={`${item.icon} ${cx(item.name)}`}></i>;
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
