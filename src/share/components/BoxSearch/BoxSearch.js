import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './boxSearch.module.scss';

const cx = classNames.bind(styles);

const BoxSearch = (props) => {
  const [data, setData] = useState(
    props.dataChange
      ? props.data.filter((i) => !props.dataChange.includes(i))
      : props.data
  );
  const [search, setSearch] = useState('');
  const boxRef = useRef(null);

  const clickOutsideRef = () => {
    document.addEventListener('mousedown', (e) => {
      // user click toggle
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        props.setShow(false);
      }
    });
  };

  clickOutsideRef();

  const handleSetData = (item) => {
    if (props.dataChange) {
      if (!props.dataChange.includes(item)) {
        props.setDataChange([...props.dataChange, item]);
      } else {
        props.setDataChange([...props.dataChange]);
      }
    } else {
      props.setDataChange(item);
    }
    setData(props.data.filter((i) => i.id !== item.id));
    props.setShow(false);
    setSearch('');
  };
  const handleClearData = (e) => {
    props.setData({});
    setData(props.data);
    setSearch('');
  };
  const handleSearchData = (e) => {
    const searchData = props.data.filter((i) =>
      i.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (searchData.length === 0) {
      searchData.push('No results');
    }
    setSearch(e.target.value);
    setData(searchData);
  };
  return (
    <>
      {props.show ? (
        <div id={cx('box')} ref={boxRef}>
          <div id={cx('input-search')}>
            <input
              type="text"
              name="search"
              autoFocus={true}
              placeholder="search"
              value={search}
              onChange={handleSearchData}
            />
            {props.close ? (
              <i
                id={cx('icon-search')}
                className={`bx bx-x `}
                onClick={handleClearData}
              ></i>
            ) : null}
          </div>
          {data.map((item, index) => {
            if (item === 'No results') {
              return <p key={item.id || index}>{item.name || item}</p>;
            } else {
              return (
                <div
                  onClick={() => handleSetData(item)}
                  key={item.id || index}
                  className={cx('box-item')}
                >
                  {item.icon ? (
                    <i
                      className={`${item.icon}  ${cx(item.name, 'box-icon')}`}
                      style={
                        item.color && {
                          color: item.color,
                        }
                      }
                    ></i>
                  ) : null}
                  {item.image ? <img src={item.image} alt="error" /> : null}

                  <p>{item.name || item}</p>
                </div>
              );
            }
          })}
        </div>
      ) : null}
    </>
  );
};

export default BoxSearch;
