import React from 'react';
import classNames from 'classnames/bind';
import styles from './layout.module.scss';
import SideBar from '../components/Sidebar/SideBar';
import ProjectSideBar from '../components/SidebarProject/ProjectSideBar';
import { Outlet } from 'react-router-dom';
import BoxSearchIssue from '../components/SearchIssues/BoxSearchIssue';
import CreateTask from '../components/Task/CreateTask/CreateTask';
import TaskDetail from '../components/Task/TaskDetail/TaskDetail';
import { useSelector } from 'react-redux';
import noProject from '../../../assets/images/no-project.png';
import { AiOutlineFileSearch } from 'react-icons/ai';

const cx = classNames.bind(styles);

const Layout = () => {
  const projectItem = useSelector((state) => state.project.projectItem);

  return (
    <div className={cx('wrapper')}>
      <div className="modal-workspace">
        <TaskDetail />
        <CreateTask />
        <BoxSearchIssue />
      </div>
      <div className="sideBar">
        <SideBar />
      </div>
      <div className="[roject-sideBar">
        <ProjectSideBar />
      </div>

      <div className={cx('content')}>
        {Object.keys(projectItem).length === 0 ? (
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
