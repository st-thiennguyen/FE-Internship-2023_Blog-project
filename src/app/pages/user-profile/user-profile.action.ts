import { Dispatch } from 'react';
import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';
import { getUserPosts, getUserProfile } from '../../shared/services/user.service';
import { ProfileModel } from '../../models/post';
import { deletePostItem } from '../../shared/services';

export const getUserProfileStart = () => {
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

export const deletePostItemStart = () => {
  return {
    type: ACTIONS_TYPE.REMOVE_POST_ITEM,
  };
};

const deletePostItemSuccess = (id: number, res: string) => {
  return {
    type: ACTIONS_TYPE.REMOVE_POST_ITEM_SUCCESS,
    payload: {id, res},
  };
};

const deletePostItemFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.REMOVE_POST_ITEM_FAILURE,
    payload: error,
  };
};

export const deletePost = (id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(deletePostItemStart());
  try {
    const response: any = await deletePostItem(id);
    dispatch(deletePostItemSuccess(id, response))
  } catch (error) {
   dispatch(deletePostItemFailure(error as any)) 
  }
}

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
