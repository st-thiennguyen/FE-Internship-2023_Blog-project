import { Dispatch } from 'react';
import axios from 'axios';

import { RegisterProps } from '../../models/auth';
import { ENDPOINT, StorageKey } from '../../shared/constants';
import { login, register } from '../../shared/services/index';
import { setLocalStorage } from '../../shared/utils';
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

export const registerReset = () => {
  return {
    type: ACTIONS_TYPE.REGISTER_RESET_STATE,
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

export const registerFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.REGISTER_FAILURE,
    payload: error,
  };
};

export const logoutRequest = () => {
  return {
    type: ACTIONS_TYPE.LOGOUT_START
  }
}

export const logoutSuccess = (res: string) => {
  return {
    type: ACTIONS_TYPE.LOGOUT_SUCCESS,
    payload: res,
  };
};

export const logoutFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.LOGOUT_FAILURE,
    payload: error,
  };
};



export const registerAction =
  (registerData: RegisterProps): RootThunk =>
    async (dispatch: Dispatch<RootAction>) => {
      dispatch(registerStart());
      try {
        const response = await register(registerData);
        dispatch(registerSuccess(`${response}`));
      } catch (error) {
        dispatch(registerFailure(`${error}`));
      }
    };

export const loginAction = (email: string, password: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(loginRequest());
  try {
    const data: any = await login(email, password);
    dispatch(loginSuccess(data));
    setLocalStorage(StorageKey.AUTH, data);
  } catch (error: any) {
    dispatch(loginFailure(error));
  }
}

export const logoutAction = (token: any) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(logoutRequest());
  try {
    const response = await axios.post(ENDPOINT.auth.logout, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(logoutSuccess(response.data));
  } catch (error) {
    console.error('Failed to logout:', error);
  }
} 
