import axios from 'axios';

import { RegisterProps } from '../../models/auth';
import { ENDPOINT } from '../constants/endpoint';
import { ApiService } from './config';

export const register = (registerData: RegisterProps) => {
  const api = new ApiService();
  return api.post(ENDPOINT.auth.register, registerData);
};

export const fetchAuthLogin = (email: string, password: string) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const response = await axios.post(ENDPOINT.auth.login, { email, password });
      resolve(response.data);
    } catch (error: any) {
      reject(error);
    }
  });
};
