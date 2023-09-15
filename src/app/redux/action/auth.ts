import axios from 'axios';
import { Dispatch } from 'react';

import { RegisterProps } from '../../models/auth';
import { postRegister } from '../../shared/services/auth/register';
import { RootAction, RootThunk } from '../store';
import * as ACTIONS_TYPE from '../type';

export const loginRequest = () => {
  return {
    type: ACTIONS_TYPE.LOGIN_START,
  };
};

export const loginSuccess = (res: any) => {
  return {
    type: ACTIONS_TYPE.LOGIN_SUCCESS,
    payload: res,
  };
};

export const loginFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.LOGIN_FAILURE,
    payload: error,
  };
};

export const registerStart = () => {
  return {
    type: ACTIONS_TYPE.REGISTER_START,
  };
};

export const registerSuccess = (res: string) => {
  return {
    type: ACTIONS_TYPE.REGISTER_SUCCESS,
    payload: res,
  };
};

export const registerFailure = (error: string[]) => {
  return {
    type: ACTIONS_TYPE.REGISTER_FAILURE,
    payload: error,
  };
};

export const login = (email: string, password: string) => async (dispatch: any) => {
  try {
    const response = await axios.post(
      'http://ec2-18-143-176-131.ap-southeast-1.compute.amazonaws.com:3000/api/v1/users/login',
      { email, password },
    );
    dispatch(loginSuccess(response.data));
    console.log(response);
  } catch (error: any) {
    dispatch(loginFailure(error));
  }
};

export const registerAccount =
  (registerData: RegisterProps): RootThunk =>
  async (dispatch: Dispatch<RootAction>) => {
    dispatch(registerStart());
    const res = await postRegister(registerData);
    if (res.errors) {
      dispatch(registerFailure(res.errors[0]));
    } else {
      dispatch(registerSuccess(res));
    }
  };
