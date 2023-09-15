import { Dispatch } from 'react';

import { RegisterProps } from '../../models/auth';
import { postRegister } from '../../shared/services/auth/register';
import { RootAction, RootThunk } from '../store';
import * as ACTIONS_TYPE from '../type';

import { fetchAuthLogin } from '../../shared/services/auth/login';
import { setLocalStorage } from '../../shared/utils';
import { StorageKey } from '../../shared/constants';

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

export const login = (email: string, password: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(loginRequest());
  try {
    const data: any = await fetchAuthLogin(email, password)
    dispatch(loginSuccess(data));
    setLocalStorage(StorageKey.AUTH, data);
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data.errors[0]));
  }
} 
