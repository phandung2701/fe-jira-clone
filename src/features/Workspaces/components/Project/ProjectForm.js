import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './projectForm.module.scss';
import BoxSearch from '../../../../share/components/BoxSearch/BoxSearch';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const cx = classNames.bind(styles);

const ProjectForm = (props) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState({});
  const [ckeditor, setSkeditor] = useState('');
  const divRef = useRef(null);
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
  const handleChangeData = (event, editor) => {
    setSkeditor(editor.getData());
  };
  useEffect(() => {
    if (divRef.current) {
      console.log(ckeditor);
      divRef.current.innerHTML = ckeditor;
    }
  }, [ckeditor]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('path')}>
          <p>
            <span>Projects</span> / <span>singularity 1.0</span> /{' '}
          </p>
        </div>
        <h3 className={cx('title')}>Project Detail</h3>
        <div className={cx('form-field')}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className={cx('form-field')}>
          <label htmlFor="url">URL</label>
          <input type="text" name="url" id="url" />
        </div>
        <div className={cx('description')}>
          <p className={cx('title')}>Description</p>
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={handleChangeData}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
          <p className={cx('content')}>
            Describe the project in as much detail as you'd like.
          </p>
          <div ref={divRef}></div>
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
        <button className={cx('btn-save')}>Save Changes</button>
      </div>
    </div>
  );
};

export default ProjectForm;
