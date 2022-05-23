import axios, { AxiosError } from 'axios';
import { userLoggedIn } from 'config/app';
import { toast } from 'react-toastify';

const publicAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true
});

const privateAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true
});

privateAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    toast.error(error.message);
    if (error.response?.status === 401) {
      userLoggedIn(false);
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export { publicAxios, privateAxios };
// eslint-disable-next-line prettier/prettier

