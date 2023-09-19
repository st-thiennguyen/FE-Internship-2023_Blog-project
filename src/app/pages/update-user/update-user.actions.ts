import { Dispatch } from 'react';
import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';
import { updateProfile } from '../../shared/services/user.service';
import { UserInfo } from '../../models/auth';
import { UserModel } from '../../models/user';

const updateProfileStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_PROFILE,
  };
};

const updateProfileSuccess = (data: UserModel) => {
  return {
    type: ACTIONS_TYPE.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};

const updateProfileFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.UPDATE_PROFILE_FAILURE,
    payload: message,
  };
};

export const updateProfileAction =
  (
    id: number,
    data: Omit<UserModel, 'id' | 'email' | 'isActive' | 'isAdmin' | 'followers' | 'followings' | 'verifyAt'>,
  ) =>
  async (dispatch: Dispatch<RootAction>) => {
    dispatch(updateProfileStart());
    try {
      const response = await updateProfile(id, data);
      dispatch(updateProfileSuccess(response as UserModel));
    } catch (error) {
      dispatch(updateProfileFailure(`${error}`));
    }
  };
