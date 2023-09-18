import { Dispatch } from 'react';

import { RootAction } from '../../../stores/store';
import { UserModel } from '../../models/post';
import ACTIONS_TYPE from '../../shared/constants/type';
import { getUsers } from '../../shared/services/user';

export const getUsersStart = () => {
  return {
    type: ACTIONS_TYPE.GET_USERS,
  };
};

export const getUsersSuccess = (data: UserModel[]) => {
  return {
    type: ACTIONS_TYPE.GET_USERS_SUCCESS,
    payload: data,
  };
};

export const getUsersFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_USERS_FAILURE,
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
