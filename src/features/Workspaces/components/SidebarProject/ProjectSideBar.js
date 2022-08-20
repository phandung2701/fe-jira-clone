import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './projectSidebar.module.scss';
import { FiSettings } from 'react-icons/fi';
import { CgClapperBoard } from 'react-icons/cg';
import { AiOutlineProject } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosClient from '../../../../api/axiosClient';
import useAxios from '../../../../hook/useAxios';

const cx = classNames.bind(styles);

const data = [
  { id: 1, name: 'project 1' },
  { id: 2, name: 'project 2' },
  { id: 3, name: 'project 3' },
];

const ProjectSideBar = () => {
  const [tab, setTab] = useState(1);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.accessToken);
  const project = useSelector((state) => state.project.projectItem);
  const axiosToken = useAxios();
  useEffect(() => {
    const fetchData = async () => {
      const data = await axiosToken.get('/project', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
    };
    fetchData();
  }, []);
  const handleSetting = () => {
    setTab(2);
    navigate('/project/settings');
  };
  const handleKanban = () => {
    setTab(1);
    navigate('/project/board');
  };
  return (
    <div className={cx('wrapper')}>
      {Object.keys(project).length > 0 ? (
        <>
          {' '}
          <div className={cx('project-logo')}>
            <i className="bx bxs-user-rectangle"></i>
            <div className={cx('project-info')}>
              <p>Singularity 1.0</p>
              <p>software project</p>
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
        <p>Project</p>
        {data.map((project) => (
          <div
            className={cx('project-item', tab === 1 && 'active')}
            key={project.id}
          >
            <AiOutlineProject className={cx('icon')} />
            <span>{project.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSideBar;
