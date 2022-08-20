import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './projectSidebar.module.scss';
import { FiSettings } from 'react-icons/fi';
import { CgClapperBoard } from 'react-icons/cg';
import { AiOutlineProject } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../../../../hook/useAxios';
import {
  projectList,
  setProjectItem,
} from '../../../../redux/reducers/projectSlice';
import { showCreateProject } from '../../../../redux/reducers/modalSlice';

const cx = classNames.bind(styles);

const ProjectSideBar = () => {
  const [tab, setTab] = useState(1);
  const [projectActive, setProjectActive] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const project = useSelector((state) => state.project.projectItem);
  const axiosToken = useAxios();
  /* eslint-disable */
  useEffect(() => {
    const fetchData = async () => {
      const projects = await axiosToken.get('/project', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(projectList(projects.data));
    };
    fetchData();
  }, []);
  const projectLists = useSelector((state) => state.project.projectList);

  const handleSetting = () => {
    setTab(2);
    navigate('/project/settings');
  };
  const handleKanban = () => {
    setTab(1);
    navigate('/project/board');
  };
  const handleProjectItem = (item) => {
    dispatch(setProjectItem(item));
    navigate('/project/board');
    setProjectActive(item.id);
    setTab(1);
  };
  const handleShowCreateProject = () => {
    dispatch(showCreateProject());
  };
  return (
    <div className={cx('wrapper')}>
      {Object.keys(project).length > 0 ? (
        <>
          {' '}
          <div className={cx('project-logo')}>
            <i className="bx bxs-user-rectangle"></i>
            <div className={cx('project-info')}>
              <p>{project.name}</p>
              <p>{project.category}</p>
            </div>
          </div>
          <div
            className={cx('kanban-borad', tab === 1 && 'active')}
            onClick={handleKanban}
          >
            <CgClapperBoard className={cx('icon')} />
            <span>Kanban Board</span>
          </div>
          <div
            className={cx('project-setting', tab === 2 && 'active')}
            onClick={handleSetting}
          >
            <FiSettings className={cx('icon')} />
            <span>Project settings</span>
          </div>
          <div className={cx('horizontal')}></div>
        </>
      ) : null}
      <div className={cx('project-list')}>
        <p className={cx('title')}>Project</p>
        {projectLists.map((project) => (
          <div
            className={cx(
              'project-item',
              projectActive === project.id && 'active'
            )}
            key={project.id}
            onClick={() => handleProjectItem(project)}
          >
            <AiOutlineProject className={cx('icon')} />
            <span>{project.name}</span>
          </div>
        ))}
        <div className={cx('create-project')} onClick={handleShowCreateProject}>
          <i className="bx bx-plus"></i>
          <p>Create Project</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectSideBar;
