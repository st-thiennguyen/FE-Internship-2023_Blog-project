import { Dispatch } from 'react';

import { RegisterProps } from '../../models/auth';
import { postRegister } from '../../shared/services/auth/register';
import { RootAction, RootThunk } from '../store';
import * as ACTIONS_TYPE from '../type';

import { fetchAuthLogin } from '../../shared/services/auth/login';
import { setLocalStorage } from '../../shared/utils';
import { StorageKey } from '../../shared/constants';
import { postLogout } from '../../shared/services/auth/logout';
import axios from 'axios';
import { ENDPOINT } from '../../shared/constants/endpoint';

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

export const registerFailure = (error: string[]) => {
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

export const logout = (token: any) => async (dispatch: Dispatch<RootAction>) => {
  try {
    const response = await axios.post(ENDPOINT.auth.logout, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      dispatch(logoutRequest())
    } else {
      console.error('Logout failed:', response.statusText);
    }
  } catch (error) {
    console.error('Failed to logout:', error);
  }
} 