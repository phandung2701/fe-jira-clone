import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './boxSearchIssue.module.scss';
import {
  closeModalIssues,
  showTaskDetail,
} from '../../../../redux/reducers/modalSlice';
import { typetask } from '../../../../share/constants/task';
import { searchTask, taskDetail } from '../../../../api/taskRequest';
import useAxios from '../../../../hook/useAxios';
import { toast } from 'react-toastify';
import { AiOutlineFileSearch } from 'react-icons/ai';

const cx = classNames.bind(styles);

const BoxSearchIssue = () => {
  const modalRef = useRef();
  const closeRef = useRef();
  const modalIssues = useSelector((state) => state.modal.modalIssues);
  const tasks = useSelector((state) => state.task.taskList);
  const projectItem = useSelector((state) => state.project.projectItem);
  const taskSearch = useSelector((state) => state.task.taskSearch);
  const [search, setSearch] = useState('');
  const axiosToken = useAxios();

  const dispatch = useDispatch();
  const handleCloseSearchIssues = (e) => {
    e.stopPropagation();
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      dispatch(closeModalIssues());
    } else if (closeRef.current.contains(e.target)) {
      dispatch(closeModalIssues());
    }
  };
  const handleChangeSearch = async (e) => {
    if (typeof projectItem === 'object') {
      if (Object.keys(projectItem).length > 0) {
        setSearch(e.target.value);
        if (!search) {
        } else {
          const data = {
            name: e.target.value,
            id: projectItem.id,
            arrAssignees: [],
          };
          await searchTask(axiosToken, data, dispatch);
        }
      } else {
        toast.error('Create task failed, Please select the project first', {
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
  };
  const handleShowTaskDetail = async (task) => {
    try {
      await taskDetail(axiosToken, task.id, dispatch);
      dispatch(showTaskDetail());
    } catch (err) {
      console.log(err);
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
                value={search}
                onChange={handleChangeSearch}
                placeholder="Search issues by summary, description..."
              />
            </div>
            <div className={cx('recent-issues')}>
              {!search ? (
                <p className={cx('title')}>recent issues</p>
              ) : (
                <p className={cx('title')}>matching issues</p>
              )}
              <div className={cx('list-issues')}>
                {!search ? (
                  tasks &&
                  tasks.length > 0 &&
                  tasks.map((task) => (
                    <div
                      className={cx('list-issue-item')}
                      key={task.id}
                      onClick={() => handleShowTaskDetail(task)}
                    >
                      {typetask
                        .filter((item) => item.name === task.type)
                        .map((type) => (
                          <i
                            key={type.id}
                            className={`${type.icon} ${cx(type.name || '')}`}
                          ></i>
                        ))}
                      <div className={cx('content')}>
                        <p>{task.title}</p>
                        <p>{`${task.type} - ${task.id}`}</p>
                      </div>
                    </div>
                  ))
                ) : taskSearch && taskSearch.length > 0 ? (
                  taskSearch.map((task) => (
                    <div
                      className={cx('list-issue-item')}
                      key={task.id}
                      onClick={() => handleShowTaskDetail(task)}
                    >
                      {typetask
                        .filter((item) => item.name === task.type)
                        .map((type) => (
                          <i
                            key={type.id}
                            className={`${type.icon} ${cx(type.name || '')}`}
                          ></i>
                        ))}
                      <div className={cx('content')}>
                        <p>{task.title}</p>
                        <p>{`${task.type} - ${task.id}`}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={cx('no-search')}>
                    <AiOutlineFileSearch className={cx('icon-no-project')} />
                    <p>We couldn't find anything matching your search</p>
                    <p>Try again with a different term.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BoxSearchIssue;
