import { Dispatch } from 'react';

import { PostModel, QueryPost } from '../../models/post';
import { getPostDraft, getPublicPosts } from '../../shared/services/index';
import { RootAction } from '../../stores/store';
import { ACTIONS_TYPE, StorageKey } from '../../shared/constants';
import { getLocalStorage } from '../../shared/utils';
import { Auth } from '../../models/auth';

export const getDraftPost = () => {
  return {
    type: ACTIONS_TYPE.GET_DRAFT_POST,
  };
};

export const getDraftPostSuccess = (data: PostModel[]) => {
  const user: Auth = getLocalStorage(StorageKey.AUTH);
  const newData = data.map((item) => {
    return { ...item, user: user.userInfo };
  });
  return {
    type: ACTIONS_TYPE.GET_DRAFT_POST_SUCCESS,
    payload: newData,
  };
};

export const getDraftPostFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_DRAFT_POST_FAILURE,
    payload: message,
  };
};

export const getPostWithTags = () => {
  return {
    type: ACTIONS_TYPE.GET_POST_WITH_TAG,
  };
};

export const getPostWithTagsSuccess = (data: PostModel[]) => {
  return {
    type: ACTIONS_TYPE.GET_POST_WITH_TAG_SUCCESS,
    payload: data,
  };
};

export const getPostWithTagsFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_POST_WITH_TAG_FAILURE,
    payload: message,
  };
};

export const resetCurrentPage = () => {
  return {
    type: ACTIONS_TYPE.RESET_CURRENT_PAGE_POST_WITH_TAG,
  };
};

export const loadMore = () => {
  return {
    type: ACTIONS_TYPE.LOAD_MORE_POST_WITH_TAGS,
  };
};

export const fetchPostWithTags = (query: QueryPost) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getPostWithTags());
  try {
    const response = await getPublicPosts(query);
    dispatch(getPostWithTagsSuccess(response as PostModel[]));
  } catch (err) {
    dispatch(getPostWithTagsFailure(`${err}`));
  }
};

export const getDraftPostAction = () => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getDraftPost());
  try {
    const response = await getPostDraft();
    dispatch(getDraftPostSuccess(response as PostModel[]));
  } catch (err) {
    dispatch(getDraftPostFailure(`${err}`));
  }
};
