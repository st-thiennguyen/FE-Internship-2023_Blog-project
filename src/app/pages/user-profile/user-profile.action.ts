import { Dispatch } from 'react';

import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';
import { ProfileModel } from '../../models/user';
import { getUserPosts, getUserProfile } from '../../shared/services/user.service';

const getUserProfileStart = () => {
  return {
    type: ACTIONS_TYPE.GET_PROFILE,
  };
};

const getUserProfileSuccess = (data: ProfileModel) => {
  return {
    type: ACTIONS_TYPE.GET_PROFILE_SUCCESS,
    payload: data,
  };
};

const getUserProfileFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.GET_PROFILE_FAILURE,
    payload: error,
  };
};

const getUserPostStart = () => {
  return {
    type: ACTIONS_TYPE.GET_USER_POST,
  };
};

const getUserPostSuccess = (data: ProfileModel) => {
  return {
    type: ACTIONS_TYPE.GET_USER_POST_SUCCESS,
    payload: data,
  };
};

const getUserPostFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.GET_USER_POST_FAILURE,
    payload: error,
  };
};

export const getUserProfileAction = (id: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getUserProfileStart());
  try {
    const res = await getUserProfile(id);
    dispatch(getUserProfileSuccess(res as ProfileModel));
  } catch (error) {
    dispatch(getUserProfileFailure(`${error}`));
  }
};

export const getUserPostAction = (id: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getUserPostStart());
  try {
    const res = await getUserPosts(id);
    dispatch(getUserPostSuccess(res as ProfileModel));
  } catch (error) {
    dispatch(getUserPostFailure(`${error}`));
  }
};
