import { LOGIN_START } from './../type';
import * as ACTIONS_TYPE from '../type';
import axios from 'axios';

export const loginRequest = () => {
  return {
    type: ACTIONS_TYPE.LOGIN_START,
  }
}

export const loginSuccess = (res: any) => {
  return {
    type: ACTIONS_TYPE.LOGIN_SUCCESS,
    payload: res
  }
}

export const loginFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.LOGIN_FAILURE,
    payload: error,
  }
}

export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    const response = await axios.post('http://ec2-18-143-176-131.ap-southeast-1.compute.amazonaws.com:3000/api/v1/users/login', { email, password });
    dispatch(loginSuccess(response.data));
    console.log(response);
  } catch (error: any) {
    dispatch(loginFailure(error));
  }
}