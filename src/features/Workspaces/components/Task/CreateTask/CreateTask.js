import React, { Fragment, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './createTask.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeCreateTask } from '../../../../../redux/reducers/modalSlice';
import BoxSearch from '../../../../../share/components/BoxSearch/BoxSearch';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import image1 from '../../../../../assets/images/image1.jpg';
import image2 from '../../../../../assets/images/image2.jpg';

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
const CreateTask = () => {
  const [showType, setShowType] = useState(false);
  const [showReporter, setShowReporter] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [showAssignees, setShowAssignees] = useState(false);

  const createTask = useSelector((state) => state.modal.createTask);
  const projectItem = useSelector((state) => state.project.projectItem);

  const closeRef = useRef(null);
  const btnCloseRef = useRef(null);

  const [typeIssue, setTypeIssue] = useState(typetask[0]);
  const [reporter, setReporter] = useState({});
  const [assignees, setAssignees] = useState([]);

  const [priority, setPriority] = useState(priorityData[2]);
  const [nameTask, setNameTask] = useState('');
  const [description, setDescription] = useState('');

  const handleShowBox = (e, params) => {
    e.stopPropagation();
    switch (params) {
      case 'type':
        return setShowType(true);
      case 'reporter':
        return setShowReporter(true);
      case 'priority':
        return setShowPriority(true);
      default:
        return;
    }
  };
  const dispatch = useDispatch();

  const handleCloseCreateTask = (e) => {
    if (closeRef.current && !closeRef.current.contains(e.target)) {
      dispatch(closeCreateTask());
    } else if (btnCloseRef.current && btnCloseRef.current.contains(e.target)) {
      dispatch(closeCreateTask());
    }
  };
  const handleDeleteAssignees = (item) => {
    setAssignees(assignees.splice(assignees.indexOf(item), 1));
  };

  return (
    <Fragment>
      {createTask ? (
        <div className={cx('wrapper')} onClick={handleCloseCreateTask}>
          <div className={cx('container')} ref={closeRef}>
            <h3>Create issue</h3>
            <div className={cx('form-field')}>
              <label htmlFor="category">Issue Type</label>
              <div className={cx('input-select')}>
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

                <input
                  type="text"
                  name="category"
                  id="category"
                  onClick={(e) => handleShowBox(e, 'type')}
                  className={cx('input-category')}
                  value={typeIssue.name || ''}
                  readOnly={true}
                />
                <BoxSearch
                  setDataChange={setTypeIssue}
                  setShow={setShowType}
                  show={showType}
                  data={typetask}
                />
              </div>
              <p>Start typing to get a list of possible matches.</p>
            </div>
            <div className={cx('horizontal')}></div>
            <div className={cx('form-field')}>
              <label htmlFor="name">Short Summary</label>
              <input
                type="text"
                name="name"
                id="name"
                value={nameTask}
                onChange={(e) => setNameTask(e.target.value)}
              />
              <p>Concisely summarize the issue in one or two sentences.</p>
            </div>
            <div className={cx('description')}>
              <p className={cx('title')}>Description</p>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={(event, editor) => setDescription(editor.getData())}
              />
            </div>
            <div className={cx('form-field')}>
              <label htmlFor="reporter">Reporter</label>
              <div className={cx('input-select')}>
                {avatar
                  .filter((item) => item.name === reporter.name)
                  .map((img) => (
                    <img key={img.id} src={img.image} alt={'error'} />
                  ))}

                <input
                  type="text"
                  name="reporter"
                  id="reporter"
                  onClick={(e) => handleShowBox(e, 'reporter')}
                  className={cx('input-category')}
                  value={reporter.name || ''}
                  readOnly={true}
                />
              </div>
              <BoxSearch
                setDataChange={setReporter}
                setShow={setShowReporter}
                show={showReporter}
                data={avatar}
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
            <div className={cx('form-field')}>
              <label htmlFor="priority">Priority</label>
              <div className={cx('input-select')}>
                {priorityData
                  .filter((item) => item.name === priority.name)
                  .map((element) => (
                    <i
                      key={element.id}
                      style={{ color: element.color }}
                      className={`${element.icon} ${cx(
                        element.name,
                        'createTask-icon'
                      )}`}
                    ></i>
                  ))}

                <input
                  type="text"
                  name="priority"
                  id="priority"
                  onClick={(e) => handleShowBox(e, 'priority')}
                  className={cx('input-category')}
                  value={priority.name || ''}
                  readOnly={true}
                />
              </div>
              <BoxSearch
                setDataChange={setPriority}
                setShow={setShowPriority}
                show={showPriority}
                data={priorityData}
              />
              <p>Priority in relation to other issues.</p>
            </div>

            <div className={cx('btn')}>
              <p>Create task</p>
              <p ref={btnCloseRef}>Cancel</p>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default CreateTask;
