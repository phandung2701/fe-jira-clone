import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';
import { updateToken } from '../redux/reducers/authSlice';

const useAxios = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const dispatch = useDispatch();
  const axiosToken = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },

    credentials: 'include',
    paramsSerializer: (params) => queryString.stringify(params),
  });

  const HandleRefreshToken = async () => {
    try {
      const res = await axios.post(
        'http://localhost:1337/api/v1/auth/refreshToken',
        {
          withCredentials: true,
          data: refreshToken,
        }
      );

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  axiosToken.interceptors.request.use(async (config) => {
    const date = new Date();
    const decodeToken = jwtDecode(accessToken);

    if (decodeToken.exp < date.getTime() / 1000) {
      const data = await HandleRefreshToken();
      dispatch(
        updateToken({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );
      config.headers['authorization'] = 'Bearer ' + data.accessToken;
    }
    return config;
  });
  return axiosToken;
};

export default useAxios;
