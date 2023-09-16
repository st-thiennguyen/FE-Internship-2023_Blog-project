import axios, { AxiosError } from 'axios';

import { RegisterProps } from '../../models/auth';
import { ENDPOINT } from '../constants/endpoint';

export const postRegister = async (registerData: RegisterProps) => {
  try {
    const response = await axios.post(`${ENDPOINT.auth.register}`, registerData);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data;
  }
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
