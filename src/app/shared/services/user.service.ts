import { ENDPOINT } from '../constants/endpoint';
import { ApiService } from './index';

export const getUsers = () => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.users.index}`);
};

export const getUserProfile = (id: string) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.users.index}/${id}`);
};

export const getUserPosts = (id: string) => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.users.index}/${id}/posts`);
};
