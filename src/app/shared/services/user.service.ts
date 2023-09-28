import { ApiService } from './config';
import { ENDPOINT } from '../constants';
import { UserInfo } from '../../models/auth';
import { FormChangePassword } from '../../models/user';

export const updateProfile = (data: Omit<UserInfo, 'id' | 'email'>) => {
  const api = new ApiService();
  return api.put(`${ENDPOINT.users.index}/me`, { ...data });
};

export const updatePassword = (data: FormChangePassword) => {
  const api = new ApiService();
  return api.put(`${ENDPOINT.users.updatePassword}`, data);
};

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

export const updateFollow = (id: string) => {
  const api = new ApiService();
  return api.post(`${ENDPOINT.friends.index}/follow`, { followingId: id });
};

export const getBookmark = () => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.bookmark.index}`);
};

export const toggleBookmark = (postId: number) => {
  const api = new ApiService();
  return api.post(`${ENDPOINT.bookmark.index}`, {postId: postId.toString()} );
};
