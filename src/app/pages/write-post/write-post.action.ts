import { Dispatch } from 'react';
import { RootAction } from '../../stores/store';
import { postArticles, updatePostArticles } from '../../shared/services';
import { PostModel } from '../../models/post';
import { ACTIONS_TYPE } from '../../shared/constants';
import { showToast } from '../../shared/components/toast/toast.actions';
import { ToastType } from '../../models/toast';

export const resetWriteState = () => {
  return {
    type: 'RESET_STATE_WRITEPOST',
  };
};

export const addPostStart = () => {
  return {
    type: ACTIONS_TYPE.ADD_POST,
  };
};

export const addPostSuccess = (data: any) => {
  return {
    type: ACTIONS_TYPE.ADD_POST_SUCCESS,
    payload: data,
  };
};

export const addPostFailure = (error: any) => {
  return {
    type: ACTIONS_TYPE.ADD_POST_FAILURE,
    payload: error,
  };
};

export const updatePostStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_POST,
  };
};

export const updatePostSuccess = (data: any) => {
  return {
    type: ACTIONS_TYPE.UPDATE_POST_SUCCESS,
    payload: data,
  };
};

export const updatePostFailure = (error: any) => {
  return {
    type: ACTIONS_TYPE.UPDATE_POST_FAILURE,
    payload: error,
  };
};

export const getUserProfileStart = () => {
  return {
    type: ACTIONS_TYPE.GET_PROFILE,
  };
};

export const createPost = (data: PostModel) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(addPostStart());
  try {
    const res = await postArticles(data);
    dispatch(addPostSuccess(res));
    dispatch(showToast('Create post success', ToastType.SUCCESS));
  } catch (error) {
    dispatch(addPostFailure(error));
    dispatch(showToast(`${error}`, ToastType.ERROR));
  }
};

export const updatePost = (data: PostModel, id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(updatePostStart());
  try {
    const res = await updatePostArticles(data, id);
    dispatch(updatePostSuccess(res));
    dispatch(showToast('Update post success', ToastType.SUCCESS));
  } catch (error) {
    dispatch(updatePostFailure(error));
    dispatch(showToast(`${error}`, ToastType.ERROR));
  }
};
