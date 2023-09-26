import { Dispatch } from 'react';

import { PostModel, QueryPost } from '../../models/post';
import { getPublicPosts } from '../../shared/services/index';
import { RootAction } from '../../stores/store';
import { ACTIONS_TYPE } from '../../shared/constants';

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
