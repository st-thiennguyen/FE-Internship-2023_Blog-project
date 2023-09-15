import { Dispatch } from 'react';

import * as ACTIONS_TYPE from '../type';
import { RootAction } from '../store';
import { fetchAuthLogin } from '../../shared/services/auth/login';
import { setLocalStorage } from '../../shared/utils';
import { StorageKey } from '../../shared/constants';
import { Auth } from '../../models/auth';

export const loginRequest = () => {
  return {
    type: ACTIONS_TYPE.LOGIN_START,
  }
}

export const loginSuccess = (data: Auth) => {
  return {
    type: ACTIONS_TYPE.LOGIN_SUCCESS,
    payload: data
  }
}

export const loginFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.LOGIN_FAILURE,
    payload: error,
  }
}

export const login = (email: string, password: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(loginRequest());
  try {
    const data: any = await fetchAuthLogin(email, password)
    dispatch(loginSuccess(data));
    setLocalStorage(StorageKey.AUTH, data);
  } catch (error: any) {
    console.log(error.response?.data.errors[0]);
    dispatch(loginFailure(error.response?.data.errors[0]));
  }
} 
