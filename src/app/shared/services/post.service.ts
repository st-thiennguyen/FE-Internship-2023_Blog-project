import { ENDPOINT } from '../constants/endpoint';
import { ApiService } from './index';

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

export const postArticles = (data: any) => {
  const api = new ApiService();
  return api.post(`${ENDPOINT.post.index}`, {
    ...data
  });
};


export const getResizeUrlImage = (file: any) => {
  const api = new ApiService();
  const params = {
    "type_upload": "cover-post",
    "file_name": file.name,
    "file_type": file.type,
  }
  return api.get(`${ENDPOINT.signatures.index}`, params)
};

export const UploadUrlImagePost = (url: string, file: any) => {
  const api = new ApiService();
  const formData = new FormData();
  formData.append('file', file);
  return api.put(url, file, {
    headers: {
      "Content-Type": file.type
    }
  });
}
