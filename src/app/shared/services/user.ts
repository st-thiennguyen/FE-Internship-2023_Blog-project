import { ENDPOINT } from '../constants/endpoint';
import { ApiService } from './index';

export const getUsers = () => {
  const api = new ApiService();
  return api.get(`${ENDPOINT.users.index}`);
};
