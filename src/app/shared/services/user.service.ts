import { UserInfo } from '../../models/auth';
import { formChangePassword } from '../../models/user';
import { ENDPOINT } from '../constants';
import { ApiService } from './config';

export const updateProfile = (data: Omit<UserInfo, 'id' | 'email'>) => {
  const api = new ApiService();
  return api.put(`${ENDPOINT.users.index}/me`, { ...data });
};

export const updatePassword = (data: formChangePassword) => {
  const api = new ApiService();
  return api.put(`${ENDPOINT.users.updatePassword}`, data);
};