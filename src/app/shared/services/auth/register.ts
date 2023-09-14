import axios, { AxiosError } from 'axios';

import { RegisterProps } from '../../../models/auth';
import { ENDPOINT } from '../../constants/endpoint';

export const postRegister = async (registerData: RegisterProps) => {
  try {
    return (await axios.post(`${ENDPOINT.auth.register}`, registerData)).data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data;
  }
};
