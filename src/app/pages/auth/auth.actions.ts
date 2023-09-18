import { Dispatch } from 'react';

import { RootAction, RootThunk } from '../../../stores/store';
import { RegisterProps } from '../../models/auth';
import { StorageKey } from '../../shared/constants';
import ACTIONS_TYPE from '../../shared/constants/type';
import { login, logout, register } from '../../shared/services/index';
import { removeLocalStorage, setLocalStorage } from '../../shared/utils';

export const loginRequest = () => {
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

export const logoutRequest = () => {
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
};

export const logoutAction = (token: any) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(logoutRequest());
  try {
    await logout(token).then(() => removeLocalStorage(StorageKey.AUTH));
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailure(error as string));
  }
};
