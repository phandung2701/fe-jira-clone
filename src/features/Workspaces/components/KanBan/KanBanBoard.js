import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './kanbanBoard.module.scss';
import CardTask from '../Task/CardTask/CardTask';
import { useDispatch, useSelector } from 'react-redux';
import { showTaskDetail } from '../../../../redux/reducers/modalSlice';
import useAxios from '../../../../hook/useAxios';
import {
  searchTaskKanban,
  taskDetail,
  updatePosition,
} from '../../../../api/taskRequest';
import TaskDetail from '../Task/TaskDetail/TaskDetail';
import jwtDecode from 'jwt-decode';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { workspaces } from '../../../../share/constants/task';

const cx = classNames.bind(styles);

const KanBanBoard = () => {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.task.taskList);
  const axiosToken = useAxios();
  const useList = useSelector((state) => state.auth.userList);
  const [searchName, setSearchName] = useState('');
  const [arrAssignees, setArrAssignees] = useState([]);
  const [myIssue, setMyIssue] = useState('');
  const token = useSelector((state) => state.auth.accessToken);
  const projectItem = useSelector((state) => state.project.projectItem);
  const [data, setData] = useState([]);
  const handleShowTaskDetail = async (item) => {
    try {
      await taskDetail(axiosToken, item.id, dispatch);
    } catch (err) {
      console.log(err);
    }
    dispatch(showTaskDetail());
  };

  const searchTaskBoard = async (data) => {
    await searchTaskKanban(axiosToken, data, dispatch);
  };
  const handleArrAssignees = async (item) => {
    let data = {};
    if (arrAssignees.includes(item.id)) {
      const newArr = arrAssignees.filter((i) => i !== item.id);
      setArrAssignees(newArr);
      if (!myIssue) {
        data = {
          id: projectItem.id,
          name: searchName,
          arrAssignees: newArr,
        };
      } else {
        if (newArr.includes(myIssue)) {
          data = {
            id: projectItem.id,
            name: searchName,
            arrAssignees: newArr,
          };
        } else {
          data = {
            id: projectItem.id,
            name: searchName,
            arrAssignees: [...newArr, myIssue],
          };
        }
      }
    } else {
      const arr = [...arrAssignees, item.id];
      setArrAssignees(arr);
      if (!myIssue) {
        data = {
          id: projectItem.id,
          name: searchName,
          arrAssignees: arr,
        };
      } else {
        if (arr.includes(myIssue)) {
          data = {
            id: projectItem.id,
            name: searchName,
            arrAssignees: arr,
          };
        } else {
          data = {
            id: projectItem.id,
            name: searchName,
            arrAssignees: [...arr, myIssue],
          };
        }
      }
    }
    await searchTaskBoard(data);
  };
  const handleOnlyMyissues = async () => {
    let data = {};
    const myId = jwtDecode(token).id;
    if (myIssue.includes(myId)) {
      setMyIssue('');
      data = {
        id: projectItem.id,
        name: searchName,
        arrAssignees: arrAssignees,
      };
    } else {
      setMyIssue(myId);
      if (arrAssignees.includes(myId)) {
        data = {
          id: projectItem.id,
          name: searchName,
          arrAssignees: arrAssignees,
        };
      } else {
        data = {
          id: projectItem.id,
          name: searchName,
          arrAssignees: [...arrAssignees, myId],
        };
      }
    }
    await searchTaskBoard(data);
  };
  useEffect(() => {
    const board = workspaces.map((item) => {
      const task = taskList
        .filter((i) => i.idBoard === Number(item.id))
        .sort((item1, item2) => item1 - item2);
      return { ...item, tasks: task };
    });
    setData(board);
  }, [taskList]);
  const handleChangeSearch = async (e) => {
    let data = {};
    setSearchName(e.target.value);
    if (!myIssue) {
      data = {
        id: projectItem.id,
        name: e.target.value,
        arrAssignees: arrAssignees,
      };
    } else {
      data = {
        id: projectItem.id,
        name: e.target.value,
        arrAssignees: [...arrAssignees, myIssue],
      };
    }

    await searchTaskBoard(data);
  };
  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(source, destination);
    const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
    const destinationColIndex = data.findIndex(
      (e) => e.id === destination.droppableId
    );
    const sourceCol = data[sourceColIndex];
    const destinationCol = data[destinationColIndex];

    const sourceTasks = [...sourceCol.tasks];
    const destinationTasks = [...destinationCol.tasks];

    if (source.droppableId !== destination.droppableId) {
      const [removed] = sourceTasks.splice(source.index, 1);
      console.log(removed);
      console.log(sourceCol, destinationCol);

      destinationTasks.splice(destination.index, 0, removed);
      data[sourceColIndex].tasks = sourceTasks;
      data[destinationColIndex].tasks = destinationTasks;
    } else {
      const [removed] = destinationTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      data[destinationColIndex].tasks = destinationTasks;
    }
    const dataUpdate = {
      resourceList: sourceTasks,
      destinationList: destinationTasks,
      sourceColIndex: sourceCol,
      destinationColIndex: destinationCol,
      idProject: projectItem.id,
    };
    try {
      await updatePosition(axiosToken, dataUpdate, dispatch);

      setData(data);
    } catch (err) {
      console.log(err);
    }
  };
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

          <input
            type={cx('text')}
            name="search"
            value={searchName}
            onChange={handleChangeSearch}
          />
        </div>
        <div className={cx('user')}>
          {useList.map((item) => (
            <i
              onClick={() => handleArrAssignees(item)}
              key={item.id}
              className={`${item.icon} ${cx(
                'user-icon-kanban',
                arrAssignees.includes(item.id) && 'user-active'
              )}`}
              style={{ color: `${item.color}` }}
            ></i>
          ))}
        </div>
        <button
          onClick={handleOnlyMyissues}
          className={cx(!myIssue ? '' : 'myIssueActive')}
        >
          Only My Issues
        </button>
        <button>Recently Updated</button>
        {arrAssignees.length === 0 && !myIssue && !searchName ? null : (
          <button>Clear all</button>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={cx('board')}>
          {data.map((item) => (
            <Droppable key={item.id} droppableId={item.id}>
              {(provided) => (
                <div
                  className={cx('boxTask')}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <p className={cx('taskType')}>{item.name}</p>
                  {item.tasks.length > 0 &&
                    item.tasks.map((task, index) => {
                      return (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              onClick={() => handleShowTaskDetail(task)}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                opacity: snapshot.isDragging ? '0,5' : '1',
                                ...provided.draggableProps.style,
                              }}
                            >
                              <CardTask task={task} />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanBanBoard;
