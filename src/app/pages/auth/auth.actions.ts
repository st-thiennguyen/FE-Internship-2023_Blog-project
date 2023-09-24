import { Dispatch } from 'react';

import { RegisterProps } from '../../models/auth';
import { StorageKey } from '../../shared/constants';
import ACTIONS_TYPE from '../../shared/constants/type';
import { login, logout, register } from '../../shared/services/index';
import { removeLocalStorage, setLocalStorage } from '../../shared/utils';
import { RootAction, RootThunk } from '../../stores/store';

export const loginStart = () => {
  return {
    type: ACTIONS_TYPE.LOGIN,
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
    type: ACTIONS_TYPE.REGISTER,
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

export const logoutStart = () => {
  return {
    type: ACTIONS_TYPE.LOGOUT,
  };
};

export const logoutSuccess = () => {
  return {
    type: ACTIONS_TYPE.LOGOUT_SUCCESS,
  };
};

export const logoutFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.LOGOUT_FAILURE,
    payload: error,
  };
};

export const reAssignmentAuth = (data: any) => {
  return {
    type: ACTIONS_TYPE.REASSIGNMENT_AUTH,
    payload: data,
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
  dispatch(loginStart());
  try {
    const data: any = await login(email, password);
    dispatch(loginSuccess(data));
    setLocalStorage(StorageKey.AUTH, data);
  } catch (error) {
    dispatch(loginFailure(`${error}`));
  }
};

export const logoutAction = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch(logoutStart());
  try {
    await logout();
    removeLocalStorage(StorageKey.AUTH);
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(`${error}`));
  }
};
