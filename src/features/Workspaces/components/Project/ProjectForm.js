import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './projectForm.module.scss';
import BoxSearch from '../../../../share/components/BoxSearch/BoxSearch';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../../../api/userRequest';
import useAxios from '../../../../hook/useAxios';
import { toast } from 'react-toastify';
import { getListProject, updateProject } from '../../../../api/projectRequest';
import { setProjectItem } from '../../../../redux/reducers/projectSlice';

const cx = classNames.bind(styles);

const ProjectForm = (props) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState({});
  const [description, setDescription] = useState('');
  const [projectName, setProjectName] = useState('');
  const [url, setUrl] = useState('');

  const handleShowBox = (e) => {
    e.stopPropagation();
    setShow(true);
  };

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
  const axiosToken = useAxios();
  const handleChangeData = (event, editor) => {
    setDescription(editor.getData());
  };
  const dispatch = useDispatch();

  const projectItem = useSelector((state) => state.project.projectItem);
  /* eslint-disable */
  useEffect(() => {
    setProjectName(projectItem.name);
    setUrl(projectItem.url);
    const newCategory = data.filter(
      (e) => e.name.toLowerCase() === projectItem.category.toLowerCase()
    );

    setCategory(newCategory[0]);
    setDescription(projectItem.description);
    const user = getUserList(axiosToken);
  }, []);

  const handleChangeNameProject = (e) => {
    setProjectName(e.target.value);
  };
  const onUpdateProject = async () => {
    if (!projectName) {
      toast.error('update failed, task name cannot be blank', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      const projectData = {
        name: projectName,
        category: category.name,
        description: description,
        idUser: projectItem.idUser,
        url: url,
      };
      try {
        const update = await updateProject(
          axiosToken,
          projectItem.id,
          projectData
        );

        dispatch(setProjectItem(update));
        toast.success('update successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        await getListProject(axiosToken, dispatch);
      } catch (err) {
        toast.error('update failed', {
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
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('path')}>
          <p>
            <span>Projects</span> / <span>{projectItem.name}</span> / Project
            Details
          </p>
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
        <button className={cx('btn-save')} onClick={onUpdateProject}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;
