import { Dispatch } from 'react';

import { UserModel } from '../../models/post';
import { getUsers } from '../../shared/services/user';
import { RootAction } from '../store';
import * as TYPE from '../type';

export const getUsersStart = () => {
  return {
    type: TYPE.GET_USERS_START,
  };
};

export const getUsersSuccess = (data: UserModel[]) => {
  return {
    type: TYPE.GET_USERS_SUCCESS,
    payload: data,
  };
};

export const getUsersFailure = (message: string) => {
  return {
    type: TYPE.GET_USERS_FAILURE,
    payload: message,
  };
};

export const fetchUsers = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getUsersStart());
  try {
    const response = await getUsers();

    dispatch(getUsersSuccess(response as UserModel[]));
  } catch (err) {
    dispatch(getUsersFailure(`${err}`));
  }
};
