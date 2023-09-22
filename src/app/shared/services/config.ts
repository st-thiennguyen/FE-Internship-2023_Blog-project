import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { Auth } from '../../models/auth';
import { StorageKey } from '../constants';
import { getLocalStorage } from '../utils';

export class ApiService {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_BASE_API,
      withCredentials: false,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this._setInterceptors();
  }

  // private _requiresAuthorization(url: string) {
  //   const pathsRequiringAuthorization = ['/logout'];
  //   return pathsRequiringAuthorization.some((path) => url.includes(path));
  // }

  private _setInterceptors = () => {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // const requiresAuthorization = this._requiresAuthorization(config.url!);
        // if (requiresAuthorization) {
        const auth = getLocalStorage(StorageKey.AUTH) as Auth;
        if (auth) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        // }
        return config;
      },
      (error: AxiosError) => {
        return this._handleError(error);
      },
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return this._handleError(error);
      },
    );
  };

  private _handleError = (error: AxiosError) => {
    if (error.response) {
      if (typeof error.response?.data === 'object') {
        const { errors }: any = error.response?.data;
        throw new Error(`${errors[0]}`);
      }
      if (error.response.status === 401) {
        throw new Error(`Please login to do this action !`);
      }
      console.error('Server Error :', error.response.status, error.response.data);
      throw new Error(`${error.response?.data}`);
    } else if (error.request) {
      console.error('Network Error:', error.message);
      throw new Error('Network error. Please check your internet connection.');
    } else {
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred.');
    }
  };

  public createURL(url: string, queryParams?: string | Record<string, string | number> | null): string {
    // Initialize the URL with the base URL
    let newUrl = url;
    // Ensure the base URL is not empty

    if (!url) {
      throw new Error('Base URL is required.');
    }
    // Check if there are query parameters to append
    if (typeof queryParams === 'string') {
      newUrl += `?${queryParams}`;
    } else if (typeof queryParams === 'object' && queryParams !== null) {
      if (queryParams && Object.keys(queryParams).length > 0) {
        const queryString = Object.keys(queryParams)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
          .join('&');
        newUrl += `?${queryString}`;
      }
    }

    return newUrl;
  }

  public get = (url: string, param = {}, moreConfigs = {}) => {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.get(this.createURL(url, param), { ...moreConfigs });
      this._handleResponsed(request, resolve, reject);
    });
  };

  public post = (url: string, data = {}, moreConfigs = {}) => {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.post(this.createURL(url), data, { ...moreConfigs });
      this._handleResponsed(request, resolve, reject);
    });
  };

  public put = (url: string, data = {}, moreConfigs = {}) => {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.put(this.createURL(url), data, { ...moreConfigs });
      this._handleResponsed(request, resolve, reject);
    });
  };

  public delete = (url: string, moreConfigs = {}) => {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.delete(this.createURL(url), { ...moreConfigs });
      this._handleResponsed(request, resolve, reject);
    });
  };

  private _handleResponsed(request: any, resolve: Function, reject: Function) {
    return request
      .then((res: AxiosResponse) => {
        resolve(res.data);
      })
      .catch((error: AxiosError) => {
        reject(error.message);
      });
  }
}
