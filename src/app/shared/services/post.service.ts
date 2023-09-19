import { blob } from 'node:stream/consumers';
import { StorageKey } from '../constants';
import { ENDPOINT } from '../constants/endpoint';
import { getLocalStorage } from '../utils';
import { ApiService } from './index';
import axios from 'axios';

export const getDetailPost = (id: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.index}/${id}`);
};

export const getPublicPosts = (page: number, size: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.public}`, {
    page,
    size,
  });
};

export const postArticles = async (data: any) => {
  const token = JSON.parse(localStorage.getItem('auth') as any).accessToken || ''
  console.log(token);

  const api = new ApiService();
  return await api.post(`${ENDPOINT.post.index}`, {
    ...data
  });
};

export const getImage = (file: any) => {

  const token = JSON.parse(localStorage.getItem('auth') as any).accessToken || ''
  const api = new ApiService();

  const params = {
    "type_upload": "cover-post",
    "file_name": file.name,
    "file_type": file.type,
  }
  return api.get(`${ENDPOINT.signatures}`, params);
};
export const customURL = async (url: string, file: any) => {
  const api = new ApiService();
  const token = JSON.parse(localStorage.getItem('auth') as any).accessToken || ''
  console.log(token);
  // // console.log(getBase64(file));
  // console.log(file);
  // const formData = new FormData();
  // formData.append('file', 'file');
  // console.log("file", file);
  // console.log('formData:', formData);
  // api.axiosInstance.defaults.responseType = 'blob'
  // const blob = new Blob([base64], { type: file.type });
  // const blobUrl = URL.createObjectURL(blob);
  console.log(file.name);

  await axios(url, {
    method: 'PUT',
    headers: { Authentication: `Bearer ${token}` },
    data: file
  })
};
