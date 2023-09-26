import { ApiService } from './index';
import { ENDPOINT } from '../constants/endpoint';
import { QueryPost } from '../../models/post';

export const getDetailPost = (id: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.index}/${id}`);
};

export const getPublicPosts = (query: QueryPost) => {
  const api = new ApiService();

  Object.keys(query).forEach((key) => {
    if (query[key as keyof typeof query] === undefined) {
      delete query[key as keyof typeof query];
    }
  });
  return api.get(`${ENDPOINT.post.public}`, query);
};

export const getRecommendPosts = (page: number, size: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.recommend}`, {
    page,
    size,
  });
};

export const postArticles = (data: any) => {
  const api = new ApiService();
  return api.post(`${ENDPOINT.post.index}`, data);
};

export const updatePostArticles = (data: any, id: number) => {
  const formData = new URLSearchParams();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  const api = new ApiService();
  return api.put(`${ENDPOINT.post.index}/${id}`, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const deletePostItem = (id: string) => {
  const api = new ApiService();
  return api.delete(`${ENDPOINT.post.index}/${id}`);
};

export const updateLike = (id: number) => {
  const api = new ApiService();
  return api.put(`${ENDPOINT.post.index}/${id}/likes`);
};

export const getPostComments = (id: string) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.index}/${id}/comments`);
};

export const postComment = (id: string, comment: string) => {
  const api = new ApiService();
  return api.post(`${ENDPOINT.post.index}/${id}/comments`, { content: comment });
};
