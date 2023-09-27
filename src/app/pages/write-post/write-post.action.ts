import { Dispatch } from 'react';
import { RootAction } from '../../stores/store';
import { createDraft, postArticles, updatePostArticles } from '../../shared/services';
import { PostModel, PostProps } from '../../models/post';
import { ACTIONS_TYPE } from '../../shared/constants';

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

export const createDraftStart = () => {
  return {
    type: ACTIONS_TYPE.ADD_DRAFT,
  };
};

export const createDraftSuccess = (post: PostModel) => {
  return {
    type: ACTIONS_TYPE.ADD_DRAFT_SUCCESS,
    payload: post,
  };
};

export const createDraftFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.ADD_DRAFT_FAILURE,
    payload: error,
  };
};

export const createPost = (data: PostModel) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(addPostStart());
  try {
    const res = await postArticles(data);
    dispatch(addPostSuccess(res));
  } catch (error) {
    dispatch(addPostFailure(error));
  }
};

export const updatePost = (data: PostModel, id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(updatePostStart());
  try {
    const res = await updatePostArticles(data, id);
    dispatch(updatePostSuccess(res));
  } catch (error) {
    dispatch(updatePostFailure(error));
  }
};

export const saveToDraft = (data: PostProps) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(createDraftStart());
  try {
    const res = await createDraft(data);
    dispatch(createDraftSuccess(res as PostModel));
  } catch (error) {
    dispatch(createDraftFailure(`${error}`));
  }
};
