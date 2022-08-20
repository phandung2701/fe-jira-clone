import React from 'react';
import classNames from 'classnames/bind';
import styles from './cardTask.module.scss';
import image1 from '../../../../../assets/images/image1.jpg';

const cx = classNames.bind(styles);

const CardTask = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <p>
          Try dragging issues to different columns to transition their status.
        </p>
      </div>
      <div className={cx('content')}>
        <div className={cx('priority')}>
          <i className={`bx bxs-bookmark ${cx('story')}`}></i>
          <i className={`bx bx-up-arrow-alt ${cx('High')}`}></i>
        </div>
        <div className={cx('assignees')}>
          <img src={image1} alt="error" />
          <img src={image1} alt="error" />

          <img src={image1} alt="error" />
          <div className={cx('circle-img')}>
            <span>+5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTask;
