import React from 'react';
import classNames from 'classnames/bind';
import styles from './kanbanBoard.module.scss';
import CardTask from '../Task/CardTask/CardTask';
import image1 from '../../../../assets/images/image1.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { showTaskDetail } from '../../../../redux/reducers/modalSlice';
import useAxios from '../../../../hook/useAxios';
import { taskDetail } from '../../../../api/taskRequest';
import TaskDetail from '../Task/TaskDetail/TaskDetail';

const cx = classNames.bind(styles);

const KanBanBoard = () => {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.task.taskList);
  const axiosToken = useAxios();
  const useList = useSelector((state) => state.auth.userList);
  const handleShowTaskDetail = async (item) => {
    try {
      await taskDetail(axiosToken, item.id, dispatch);
    } catch (err) {
      console.log(err);
    }
    dispatch(showTaskDetail());
  };
  const data = ['BACKLOG', 'SELECTED FOR DEVELOPMENT', 'IN PROGRESS', 'DONE'];
  return (
    <div className={cx('wrapper')}>
      <TaskDetail />

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
          {useList.map((item) => (
            <i
              key={item.id}
              className={`${item.icon} ${cx('user-icon-kanban')}`}
              style={{ color: `${item.color}` }}
            ></i>
          ))}
        </div>
        <button>Only My Issues</button>
        <button>Recently Updated</button>
      </div>
      <div className={cx('board')}>
        {data.map((item, index) => (
          <div className={cx('boxTask')} key={index}>
            <p className={cx('taskType')}>{item}</p>
            {taskList.length > 0 &&
              taskList.map((task) => {
                if (task.status === item) {
                  return (
                    <div
                      onClick={() => handleShowTaskDetail(task)}
                      key={task.id}
                    >
                      <CardTask task={task} />
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
