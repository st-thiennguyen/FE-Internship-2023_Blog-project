import { RegisterProps } from '../../models/auth';
import { ENDPOINT } from '../constants/endpoint';
import { ApiService } from './config';

export const register = (registerData: RegisterProps) => {
  const api = new ApiService();
  return api.post(ENDPOINT.auth.register, registerData);
};

export const login = (email: string, password: string) => {
  const apiLogin = new ApiService();
  return apiLogin.post(ENDPOINT.auth.login, { email, password });
};

export const logout = () => {
  const apiLogout = new ApiService();
  return apiLogout.post(ENDPOINT.auth.logout);
};
