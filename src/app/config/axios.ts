import axios from 'axios';

import { Auth } from '../models/auth';
import { StorageKey } from '../shared/constants';
import { getLocalStorage } from '../shared/utils';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 300000,
});

axiosInstance.interceptors.request.use((config) => {
  //handle token
  if (getLocalStorage(StorageKey.AUTH, {})) {
    let token: Auth = getLocalStorage(StorageKey.AUTH);
    const accessToken = token.accessToken || '';
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    switch (error.response.status) {
      case 401:
        if (!getLocalStorage(StorageKey.AUTH, {})) {
          const message401 = error.response.data.message;
          return Promise.reject(message401);
        } else {
          window.location.href = '/';
        }
        break;
      case 400:
        const message400 = error.response.data.errors || error.response.data.message;
        return Promise.reject(message400);
      default:
        break;
    }
  },
);
export default axiosInstance;
