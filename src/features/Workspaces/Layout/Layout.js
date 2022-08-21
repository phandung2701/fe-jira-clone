import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './layout.module.scss';
import SideBar from '../components/Sidebar/SideBar';
import ProjectSideBar from '../components/SidebarProject/ProjectSideBar';
import { Outlet, useNavigate } from 'react-router-dom';
import BoxSearchIssue from '../components/SearchIssues/BoxSearchIssue';
import CreateTask from '../components/Task/CreateTask/CreateTask';
import TaskDetail from '../components/Task/TaskDetail/TaskDetail';
import { useSelector } from 'react-redux';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import CreateProject from '../components/Project/CreateProject/CreateProject';

const cx = classNames.bind(styles);

const Layout = () => {
  const projectItem = useSelector((state) => state.project.projectItem);
  const navigate = useNavigate();
  /* eslint-disable */

  useEffect(() => {
    if (projectItem) {
      navigate('/project/board');
    }
  }, []);
  return (
    <div className={cx('wrapper')}>
      <div className="modal-workspace">
        <TaskDetail />
        <CreateTask />
        <BoxSearchIssue />
        <CreateProject />
      </div>
      <div className="sideBar">
        <SideBar />
      </div>
      <div className="[roject-sideBar">
        <ProjectSideBar />
      </div>

      <div className={cx('content')}>
        <ToastContainer />
        {!projectItem ? (
          <div className={cx('no-project')}>
            <AiOutlineFileSearch className={cx('icon-no-project')} />
            <p>You have not selected any project yet</p>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Layout;
