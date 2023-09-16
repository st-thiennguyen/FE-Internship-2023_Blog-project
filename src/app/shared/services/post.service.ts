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
