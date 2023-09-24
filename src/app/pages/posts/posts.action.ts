import { Dispatch } from 'react';

import { PostModel } from '../../models/post';
import ACTIONS_TYPE from '../../shared/constants/type';
import { QueryPost, getPublicPosts, getRecyclebinPost } from '../../shared/services/index';
import { RootAction } from '../../stores/store';

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

export const getPostsRecyclebin = (page: number) => {
  return {
    type: ACTIONS_TYPE.GET_RECYCLEBIN,
    payload: page,
  };
};

export const getPostsRecyclebinSuccess = (data: PostModel[]) => {
  return {
    type: ACTIONS_TYPE.GET_RECYCLEBIN_SUCCESS,
    payload: data,
  };
};

export const getPostsRecyclebinFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_RECYCLEBIN_FAILURE,
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

export const getRecyclebinAction = (query: QueryPost) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getPostsRecyclebin(query.page || 1));
  try {
    const response = await getRecyclebinPost(query);
    dispatch(getPostsRecyclebinSuccess(response as PostModel[]));
  } catch (err) {
    dispatch(getPostsRecyclebinFailure(`${err}`));
  }
};
