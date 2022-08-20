import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './createProject.module.scss';
import BoxSearch from '../../../../../share/components/BoxSearch/BoxSearch';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../../../../../hook/useAxios';
import { toast } from 'react-toastify';
import {
  createProject,
  getListProject,
} from '../../../../../api/projectRequest';
import { closeCreateProject } from '../../../../../redux/reducers/modalSlice';
import jwtDecode from 'jwt-decode';

const cx = classNames.bind(styles);
const data = [
  {
    id: 1,
    name: 'Marketing',
  },
  {
    id: 2,
    name: 'Business',
  },
  {
    id: 3,
    name: 'Software',
  },
];
const CreateProject = (props) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState(data[0]);
  const [description, setDescription] = useState('');
  const [projectName, setProjectName] = useState('');
  const [url, setUrl] = useState('');

  const showCreateProject = useSelector((state) => state.modal.createProject);
  const token = useSelector((state) => state.auth.accessToken);
  const handleShowBox = (e) => {
    e.stopPropagation();
    setShow(true);
  };

  const axiosToken = useAxios();
  const handleChangeData = (event, editor) => {
    setDescription(editor.getData());
  };
  const dispatch = useDispatch();

  /* eslint-disable */

  const handleChangeNameProject = (e) => {
    setProjectName(e.target.value);
  };
  const onCreateProject = async () => {
    if (!projectName) {
      toast.error('update failed, project name cannot be blank', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      const user = jwtDecode(token);
      const projectData = {
        name: projectName,
        category: category.name,
        description: description,
        idUser: user.id,
        url: url,
      };
      try {
        const create = await createProject(
          axiosToken,

          projectData
        );

        toast.success('create project successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        await getListProject(axiosToken, dispatch);
        dispatch(closeCreateProject());
      } catch (err) {
        toast.error('create failed', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  const handleCloseProject = () => {
    dispatch(closeCreateProject());
  };
  return (
    <>
      {' '}
      {showCreateProject ? (
        <div className={cx('wrapper')}>
          <div className={cx('container')}>
            <div className={cx('close')} onClick={handleCloseProject}>
              <i className="bx bx-x"></i>
            </div>
            <h3 className={cx('title')}>Project Detail</h3>
            <div className={cx('form-field')}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={projectName}
                onChange={handleChangeNameProject}
              />
            </div>
            <div className={cx('form-field')}>
              <label htmlFor="url">URL</label>
              <input
                type="text"
                name="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className={cx('description')}>
              <p className={cx('title')}>Description</p>
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={handleChangeData}
              />
              <p className={cx('content')}>
                Describe the project in as much detail as you'd like.
              </p>
            </div>
            <div className={cx('form-field')}>
              <label htmlFor="category">Project category</label>
              <input
                type="text"
                name="category"
                id="category"
                className={cx('input-category')}
                onClick={handleShowBox}
                value={category.name || ''}
                readOnly={true}
              />
              <i className="bx bxs-chevron-down"></i>
              <BoxSearch
                setDataChange={setCategory}
                setShow={setShow}
                show={show}
                data={data}
              />
            </div>
            <button className={cx('btn-save')} onClick={onCreateProject}>
              Create
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CreateProject;
