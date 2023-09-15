import axios, { AxiosError } from 'axios';

import { RegisterProps } from '../../../models/auth';
import { ENDPOINT } from '../../constants/endpoint';

export const postRegister = async (registerData: RegisterProps) => {
  try {
    const response = await axios.post(`${ENDPOINT.auth.register}`, registerData);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    return err.response?.data;
  }
};
