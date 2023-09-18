import { Dispatch } from 'react';

import { RootAction, RootThunk } from '../../../stores/store';
import { RegisterProps } from '../../models/auth';
import { StorageKey } from '../../shared/constants';
import ACTIONS_TYPE from '../../shared/constants/type';
import { fetchAuthLogin, register } from '../../shared/services/index';
import { setLocalStorage } from '../../shared/utils';

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

export const login = (email: string, password: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(loginRequest());
  try {
    const data: any = await fetchAuthLogin(email, password);
    dispatch(loginSuccess(data));
    setLocalStorage(StorageKey.AUTH, data);
  } catch (error: any) {
    dispatch(loginFailure(error.response?.data.errors[0]));
  }
};
