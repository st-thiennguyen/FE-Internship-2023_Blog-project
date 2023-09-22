import { ApiService } from './index';
import { ENDPOINT } from '../constants/endpoint';

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

export const getRecommendPosts = (page: number, size: number) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.recommend}`, {
    page,
    size,
  });
};

export const getPostLikes = (id: string) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.post.index}/${id}/likes`);
};

export const updateLike = (id: string) => {
  const api = new ApiService();
  return api.put(`${ENDPOINT.post.index}/${id}/likes`);
};
