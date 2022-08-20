import React, { useState, Fragment, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './taskDetail.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import image1 from '../../../../../assets/images/image1.jpg';
import image2 from '../../../../../assets/images/image2.jpg';

import { FiSend, FiLink } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FcAlarmClock } from 'react-icons/fc';
import { MdKeyboardArrowDown } from 'react-icons/md';
import BoxSearch from '../../../../../share/components/BoxSearch/BoxSearch';

import { closeTaskDetail } from '../../../../../redux/reducers/modalSlice';

const cx = classNames.bind(styles);
const typetask = [
  {
    id: 1,
    name: 'task',
    icon: 'bx bxs-checkbox-checked',
  },
  {
    id: 2,
    name: 'bug',
    icon: 'bx bxs-message-error',
  },
  {
    id: 3,
    name: 'story',
    icon: 'bx bxs-bookmark',
  },
];
const statusList = [
  {
    id: 1,
    name: 'BACKLOG',
    color: '#dfe1e6',
  },
  {
    id: 2,
    name: 'SELECTED FOR DEVELOPMENT ',
    color: '#dfe1e6',
  },
  {
    id: 3,
    name: 'IN PROGRESS',
    color: '#0052cc',
  },
  {
    id: 4,
    name: 'DONE',
    color: '#0b875b',
  },
];
const avatar = [
  {
    id: 1,
    name: 'name 1',
    image: image1,
  },
  {
    id: 2,
    name: 'name 2',
    image: image2,
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
    name: 'medium',
    icon: 'bx bx-up-arrow-alt',
    color: '#e98237',
  },
  {
    id: 4,
    name: 'low',
    icon: 'bx bx-down-arrow-alt',
    color: '#58a65b',
  },
  {
    id: 5,
    name: 'lowest',
    icon: 'bx bx-down-arrow-alt',
    color: '#5aa75d',
  },
];
const html = `<p>Before you start work on an issue, you can set a time or other type of estimate to calculate how much work you believe it'll take to resolve it. Once you've started to work on a specific issue, log time to keep a record of it.</p><p>&nbsp;</p><ul><li>Open the issue and select&nbsp;••• &gt;&nbsp;Time tracking</li><li>Fill in the<strong>&nbsp;Time Spent</strong>&nbsp;field</li><li>Fill in the <strong>Time Remaining</strong> field and click Save</li></ul><p>&nbsp;</p><h3>That's it!</h3><h2>💯💯</h2>`;
//const html = '';
const TaskDetail = () => {
  const [showType, setShowType] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showAssignees, setShowAssignees] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [showReporter, setShowReporter] = useState(false);

  const [typeIssue, setTypeIssue] = useState(typetask[0]);
  const [status, setStatus] = useState(statusList[0]);
  const [assignees, setAssignees] = useState([]);
  const [priority, setPriority] = useState(priorityData[3]);
  const [reporter, setReporter] = useState(avatar[0]);

  const [skeditor, setSkeditor] = useState(false);
  const [boxComment, setBoxComment] = useState(false);

  const desRef = useRef(null);

  const taskDetail = useSelector((state) => state.modal.taskDetail);
  const dispatch = useDispatch();
  const handleShowType = () => {
    setShowType(true);
  };
  const handleCloseTaskDetail = () => {
    dispatch(closeTaskDetail());
  };

  useEffect(() => {
    if (desRef.current) {
      desRef.current.innerHTML = html;
    }
  });
  const handleSaveDesc = () => {
    setSkeditor(false);
  };
  const handleSaveComment = () => {};
  const handleDeleteAssignees = (item) => {
    setAssignees(assignees.splice(assignees.indexOf(item), 1));
  };
  return (
    <Fragment>
      {taskDetail ? (
        <div className={cx('wrapper')}>
          <div className={cx('container')}>
            <div className={cx('header')}>
              <div className={cx('typeTask')}>
                <div className={cx('box-type')} onClick={handleShowType}>
                  {typetask
                    .filter((item) => item.name === typeIssue.name)
                    .map((type) => (
                      <i
                        key={type.id}
                        className={`${type.icon} ${cx(
                          type.name,
                          'createTask-icon'
                        )}`}
                      ></i>
                    ))}
                  <p>story-66666</p>
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
                <div>
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
                    value={
                      'Each issue can be assigned priority from lowest to highest.'
                    }
                  />
                </div>
                <div className={cx('description')}>
                  <p className={cx('title')}>Description</p>
                  <div>
                    {skeditor ? (
                      <>
                        <CKEditor
                          editor={ClassicEditor}
                          data={html}
                          onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                          }}
                          onBlur={(event, editor) => {
                            console.log('Blur.', editor);
                          }}
                          onFocus={(event, editor) => {
                            console.log('Focus.', editor);
                          }}
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
                        {html ? (
                          <div
                            ref={desRef}
                            onClick={() => setSkeditor(true)}
                          ></div>
                        ) : (
                          <p
                            className={cx('add-desc')}
                            onClick={() => setSkeditor(true)}
                          >
                            Add a description ...
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className={cx('comment')}>
                  <p className={cx('title')}>Comment</p>
                  <div className={cx('input-comment-box')}>
                    <img src={image1} alt="error" />
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
                  <div className={cx('comment-item')}>
                    <img src={image1} alt="error" />
                    <div>
                      <div className={cx('name')}>
                        <p>
                          <strong>name1</strong>
                        </p>
                        <p className={cx('time')}>4 days ago</p>
                      </div>
                      <div className={cx('content')}>
                        <p>
                          In the twilight rain these brilliant-hued hibiscus - A
                          lovely sunset.
                        </p>
                      </div>
                      <div className={cx('btn')}>
                        <p>Edit</p>
                        <p>Delete</p>
                      </div>
                    </div>
                  </div>
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
                  <p className={cx('title')}>ASSIGNEES</p>
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
                            <img src={i.image} alt="error" />
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
                    data={avatar}
                  />
                </div>
                <div className={cx('reporter')}>
                  <p className={cx('title')}>REPORTER</p>
                  <div
                    className={cx('reporter-box')}
                    onClick={() => setShowReporter(true)}
                  >
                    <img src={reporter.image} alt="err" />
                    <p>{reporter.name}</p>
                  </div>
                  <BoxSearch
                    setDataChange={setReporter}
                    setShow={setShowReporter}
                    show={showReporter}
                    data={avatar}
                    close={false}
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
                  <input type="text" name="hours" />
                </div>
                <div className={cx('time-checking')}>
                  <p className={cx('title')}>TIME TRACKING</p>
                  <div className={cx('time-checking-box')}>
                    <FcAlarmClock className={cx('time-icon')} />
                    <div className={cx('time-range')}>
                      <input type="range" />
                      <div className={cx('time-logged')}>
                        <p>12h logged</p>
                        <p>18h reamaining</p>
                      </div>
                    </div>
                  </div>
                  <p className={cx('add-info')}>Created at 5 days ago </p>
                  <p className={cx('add-info')}>Updated at 3 days ago</p>
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
