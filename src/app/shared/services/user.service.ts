import { UserInfo } from '../../models/auth';
import { ENDPOINT } from '../constants';
import { ApiService } from './config';

export const updateProfile = (id: number, data: Omit<UserInfo, 'id' | 'email'>) => {
  const api = new ApiService();
  return api.put(`${ENDPOINT.users.index}/${id}`);
};
