import React, { useState, Fragment, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './taskDetail.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { FiSend, FiLink } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FcAlarmClock } from 'react-icons/fc';
import { MdKeyboardArrowDown } from 'react-icons/md';
import BoxSearch from '../../../../../share/components/BoxSearch/BoxSearch';
import { closeTaskDetail } from '../../../../../redux/reducers/modalSlice';
import jwtDecode from 'jwt-decode';
import {
  deleteTask,
  getListTask,
  updateTask,
} from '../../../../../api/taskRequest';
import useAxios from '../../../../../hook/useAxios';
import { toast } from 'react-toastify';
import {
  priorityData,
  statusList,
  typetask,
} from '../../../../../share/constants/task';
import useDate from '../../../../../hook/useDate';
const cx = classNames.bind(styles);

const TaskDetail = () => {
  const taskDetail = useSelector((state) => state.task.taskDetail);
  const userList = useSelector((state) => state.auth.userList);
  const token = useSelector((state) => state.auth.accessToken);
  const { dateDiff } = useDate();
  const axiosToken = useAxios();

  const [showType, setShowType] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showAssignees, setShowAssignees] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [showReporter, setShowReporter] = useState(false);

  const [typeIssue, setTypeIssue] = useState(typetask[0]);
  const [status, setStatus] = useState(statusList[0]);
  const [assignees, setAssignees] = useState([]);
  const [priority, setPriority] = useState(priorityData[3]);
  const [reporter, setReporter] = useState(
    userList.filter((item) => item.id === taskDetail.reporter)[0]
  );
  const [duedate, setDuedate] = useState(4);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState();

  const [skeditor, setSkeditor] = useState(false);
  const [boxComment, setBoxComment] = useState(false);

  const desRef = useRef(null);

  const showTaskDetail = useSelector((state) => state.modal.taskDetail);
  const projectItem = useSelector((state) => state.project.projectItem);

  const dispatch = useDispatch();
  const handleShowType = () => {
    setShowType(true);
  };
  const handleChangeDuedate = async (e) => {
    setDuedate(e.target.value);
    try {
      await updateTask(
        axiosToken,
        taskDetail.id,
        { duedate: e.target.value },
        dispatch
      );

      await getListTask(axiosToken, taskDetail.idProject, dispatch);
    } catch (err) {
      console.log(err);
    }
  };
  const handleBlurDuedate = (e) => {
    if (e.target.value === '' || !Number(e.target.value)) {
      setDuedate(4);
      toast.error('update failed', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleUpdateTaskDetail = async () => {
    try {
      let setPosition = {};
      if (status.name !== taskDetail.status) {
        switch (status.name) {
          case 'BACKLOG':
            setPosition = {
              position: -1,
              idBoard: 1,
            };

            break;
          case 'SELECTED FOR DEVELOPMENT':
            setPosition = {
              position: -1,
              idBoard: 2,
            };

            break;
          case 'IN PROGRESS':
            setPosition = {
              position: -1,
              idBoard: 3,
            };

            break;
          case 'DONE':
            setPosition = {
              position: -1,
              idBoard: 4,
            };
            break;
          default:
            setPosition = {
              position: taskDetail.position,
              idBoard: taskDetail.idBoard,
            };
            break;
        }
      }
      await updateTask(
        axiosToken,
        taskDetail.id,
        {
          status: status.name,
          assignees: assignees.reduce((acc, cur) => {
            return [...acc, cur.id];
          }, []),
          reporter: reporter.id,
          type: typeIssue.name,
          priority: priority.name,
          ...setPosition,
        },
        dispatch
      );

      await getListTask(axiosToken, taskDetail.idProject, dispatch);
      toast.success('Saved !', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      toast.error('update failed', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCloseTaskDetail = () => {
    handleUpdateTaskDetail();
    dispatch(closeTaskDetail());
  };
  useEffect(() => {
    if (desRef.current) {
      desRef.current.innerHTML = taskDetail.description;
    }
  }, [taskDetail, description, skeditor]);

  useEffect(() => {
    setTitle(taskDetail.title);
    setDescription(taskDetail.description);
    const status = statusList.filter((item) => item.name === taskDetail.status);
    const type = typetask.filter((item) => item.name === taskDetail.type);
    const reporter = userList.filter((item) => item.id === taskDetail.reporter);
    const assignees = userList.filter((item) => {
      if (taskDetail.assignees !== 'undefined') {
        return taskDetail.assignees?.includes(item.id);
      }
      return [];
    });
    setStatus(status[0]);
    setTypeIssue(type[0]);
    setReporter(reporter[0]);
    setAssignees(assignees);
    setDuedate(taskDetail.duedate);
  }, [taskDetail]);

  const handleSaveDesc = async () => {
    setSkeditor(false);
    try {
      await updateTask(
        axiosToken,
        taskDetail.id,
        { description: description },
        dispatch
      );

      await getListTask(axiosToken, taskDetail.idProject, dispatch);
      toast.success('Saved !', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      toast.error('update failed', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleSaveComment = () => {};
  const handleChangeTitle = async (e) => {
    setTitle(e.target.value);
  };
  const handleUpdateTask = async () => {
    if (!title) {
      toast.error('Create task failed,  task name cannot be blank', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setTitle(taskDetail.title);
      return;
    } else {
      try {
        await updateTask(axiosToken, taskDetail.id, { title: title }, dispatch);
        await getListTask(axiosToken, taskDetail.idProject, dispatch);
        toast.success('Saved !', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } catch (err) {
        console.log(err);
        toast.error('update failed', {
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
  const handleDeleteAssignees = (item) => {
    setAssignees(assignees.filter((i) => i.id !== item.id));
  };
  const handleDeleteTask = async () => {
    try {
      await deleteTask(axiosToken, taskDetail.id, projectItem.id, dispatch);
      dispatch(closeTaskDetail());
      toast.success('delete successfully !', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      toast.error('delete failed', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <Fragment>
      {showTaskDetail ? (
        <div className={cx('wrapper')}>
          <div className={cx('container')}>
            <div className={cx('header')}>
              <div className={cx('typeTask')}>
                <div className={cx('box-type')} onClick={handleShowType}>
                  {typeof typeIssue === 'object' &&
                    typetask
                      .filter((item) => item.name === typeIssue.name)
                      .map((type) => (
                        <i
                          key={type.id}
                          className={`${type.icon} ${cx(
                            type.name || '',
                            'createTask-icon'
                          )}`}
                        ></i>
                      ))}
                  <p>{`${typeIssue.name || ''} - ${taskDetail.id}`}</p>
                </div>

                <BoxSearch
                  setDataChange={setTypeIssue}
                  setShow={setShowType}
                  show={showType}
                  data={typetask}
                />
              </div>
              <div className={cx('feedback')}>
                <div>
                  <FiSend className={cx('header-icon')} />
                  <p>Give Feedback</p>
                </div>
                <div>
                  <FiLink className={cx('header-icon')} />
                  <p>Copy link</p>
                </div>
                <div onClick={handleDeleteTask}>
                  <RiDeleteBinLine className={cx('header-icon')} />
                </div>
                <div onClick={handleCloseTaskDetail}>
                  <i className={`bx bx-x `}></i>
                </div>
              </div>
            </div>
            <div className={cx('main')}>
              <div className={cx('main-left')}>
                <div className={cx('input-title')}>
                  <textarea
                    type="text"
                    name="title"
                    id={cx('title')}
                    value={title}
                    onChange={handleChangeTitle}
                    onBlur={handleUpdateTask}
                  />
                </div>
                <div className={cx('description')}>
                  <p className={cx('title')}>Description</p>
                  <div>
                    {skeditor ? (
                      <>
                        <CKEditor
                          editor={ClassicEditor}
                          data={description}
                          onChange={(event, editor) =>
                            setDescription(editor.getData())
                          }
                        />
                        <div className={cx('btn-desc')}>
                          <button onClick={handleSaveDesc}>Save</button>
                          <button onClick={() => setSkeditor(false)}>
                            cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        {!description ? (
                          <p
                            className={cx('add-desc')}
                            onClick={() => setSkeditor(true)}
                          >
                            Add a description ...
                          </p>
                        ) : (
                          <div
                            ref={desRef}
                            onClick={() => setSkeditor(true)}
                          ></div>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className={cx('comment')}>
                  <p className={cx('title')}>Comment</p>
                  <div className={cx('input-comment-box')}>
                    {userList.map((user) => {
                      if (user.id === jwtDecode(token).id) {
                        return (
                          <i
                            key={user.id}
                            className={user.icon}
                            style={{ color: `${user.color}` }}
                          ></i>
                        );
                      }
                      return '';
                    })}
                    {boxComment ? (
                      <div className={cx('box-comment-1')}>
                        <textarea
                          name="comment"
                          id={cx('comment-input')}
                        ></textarea>
                        <div className={cx('btn-desc')}>
                          <button onClick={handleSaveComment}>Save</button>
                          <button onClick={() => setBoxComment(false)}>
                            cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={cx('box-comment-1')}
                        onClick={() => setBoxComment(true)}
                      >
                        <p className={cx('add-comment')}>Add a comment ...</p>
                        <p className={cx('tip')}>
                          <strong>Pro tip:</strong> press <span>M</span> to
                          comment
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className={cx('list-comment')}>
                  {userList.length > 0 &&
                    userList.map((user) => {
                      if (user.id === jwtDecode(token).id) {
                        return (
                          <div className={cx('comment-item')} key={user.id}>
                            <i
                              className={user.icon}
                              style={{ color: `${user.color}` }}
                            ></i>
                            <div>
                              <div className={cx('name')}>
                                <p>
                                  <strong>{user.name}</strong>
                                </p>
                                <p className={cx('time')}>4 days ago</p>
                              </div>
                              <div className={cx('content')}>
                                <p>
                                  In the twilight rain these brilliant-hued
                                  hibiscus - A lovely sunset.
                                </p>
                              </div>
                              <div className={cx('btn')}>
                                <p>Edit</p>
                                <p>Delete</p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return '';
                    })}
                </div>
              </div>
              <div className={cx('main-right')}>
                <div className={cx('status')}>
                  <p className={cx('title')}>STATUS</p>
                  <div
                    onClick={() => setShowStatus(true)}
                    className={cx('status-type', status.id > 2 && 'setColor')}
                    style={{ background: `${status.color}` }}
                  >
                    <p>{status.name}</p>
                    <MdKeyboardArrowDown className={cx('icon-status')} />
                  </div>
                  <BoxSearch
                    setDataChange={setStatus}
                    setShow={setShowStatus}
                    show={showStatus}
                    data={statusList}
                  />
                </div>
                <div className={cx('assignees')}>
                  <p className={cx('title')}>Assignees</p>
                  <div>
                    {assignees.length <= 0 ? (
                      <p
                        className={cx('unassignees')}
                        onClick={() => setShowAssignees(true)}
                      >
                        Unassignees
                      </p>
                    ) : (
                      <div className={cx('assignees-list')}>
                        {assignees.map((i) => (
                          <div key={i.id} className={cx('assignees-item')}>
                            <i
                              className={i.icon}
                              style={{ color: `${i.color}` }}
                            ></i>
                            <p>{i.name}</p>
                            <i
                              className="bx bx-x"
                              onClick={() => handleDeleteAssignees(i)}
                            ></i>
                          </div>
                        ))}
                        <div
                          className={cx('assignees-item', 'add-more')}
                          onClick={() => setShowAssignees(true)}
                        >
                          <i className="bx bx-plus"></i>
                          <p>Add more</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <BoxSearch
                    setDataChange={setAssignees}
                    setShow={setShowAssignees}
                    dataChange={assignees}
                    show={showAssignees}
                    data={userList}
                  />
                </div>
                <div className={cx('reporter')}>
                  <p className={cx('title')}>REPORTER</p>
                  <div
                    className={cx('reporter-box')}
                    onClick={() => setShowReporter(true)}
                  >
                    {!reporter ? null : (
                      <i
                        className={`${reporter.icon} ${cx('icon-reporter')}`}
                        style={{ color: `${reporter.color}` }}
                      ></i>
                    )}
                    {!reporter ? null : <p>{reporter.name}</p>}
                  </div>
                  <BoxSearch
                    setDataChange={setReporter}
                    setShow={setShowReporter}
                    show={showReporter}
                    data={userList}
                  />
                </div>
                <div className={cx('priority')}>
                  <p className={cx('title')}>PRIORITY</p>
                  <div
                    className={cx('priority-item')}
                    onClick={() => setShowPriority(true)}
                  >
                    <i
                      style={{ color: priority.color }}
                      className={`${priority.icon} `}
                    ></i>
                    <p>{priority.name}</p>
                  </div>
                  <BoxSearch
                    setDataChange={setPriority}
                    setShow={setShowPriority}
                    show={showPriority}
                    data={priorityData}
                    close={false}
                  />
                </div>
                <div className={cx('duedate')}>
                  <p className={cx('title')}>ORIGINAL ESTIMATE (HOURS)</p>
                  <input
                    type="text"
                    name="hours"
                    value={duedate}
                    onChange={(e) => handleChangeDuedate(e)}
                    onBlur={(e) => handleBlurDuedate(e)}
                  />
                </div>
                <div className={cx('time-checking')}>
                  <p className={cx('title')}>TIME TRACKING</p>
                  <div className={cx('time-checking-box')}>
                    <FcAlarmClock className={cx('time-icon')} />
                    <div className={cx('time-range')}>
                      <input
                        type="range"
                        min={0}
                        max={duedate}
                        value={dateDiff.isHours(
                          new Date(taskDetail.createdAt).toLocaleString(),
                          new Date().toLocaleString()
                        )}
                        readOnly={true}
                      />
                      <div className={cx('time-logged')}>
                        <p>
                          {dateDiff.isHours(
                            new Date(taskDetail.createdAt).toLocaleString(),
                            new Date().toLocaleString()
                          )}
                          h logged
                        </p>
                        <p>{duedate}h estimate</p>
                      </div>
                    </div>
                  </div>
                  <p className={cx('add-info')}>
                    Created at {dateDiff.timeAgos(taskDetail.createdAt)}
                  </p>
                  <p className={cx('add-info')}>
                    Updated at {dateDiff.timeAgos(taskDetail.updatedAt)}
                  </p>
                  {Number(
                    dateDiff.isHours(
                      new Date(taskDetail.createdAt).toLocaleString(),
                      new Date().toLocaleString()
                    )
                  ) > Number(taskDetail.duedate) && (
                    <p className={cx('outOfDate')}>Đã quá hạn</p>
                  )}
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default TaskDetail;
