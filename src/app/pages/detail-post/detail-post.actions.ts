import { Dispatch } from 'react';

import ACTIONS_TYPE from '../../shared/constants/type';
import { getDetailPost, getPostComments, postBookMark, postComment, updateLike } from '../../shared/services/index';
import { RootAction } from '../../stores/store';
import { PostModel } from '../../models/post';
import { InteractionItemModel, InteractionProps } from '../../models/interaction';

import { UserInfo } from '../../models/auth';

const getDetailBlogStart = () => {
  return {
    type: ACTIONS_TYPE.GET_DETAIL_BLOG,
  };
};

const getDetailBlogSuccess = (data: PostModel) => {
  return {
    type: ACTIONS_TYPE.GET_DETAIL_BLOG_SUCCESS,
    payload: data,
  };
};

const getDetailBlogFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_DETAIL_BLOG_FAILURE,
    payload: message,
  };
};

export const fetchDetailBlog = (id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getDetailBlogStart());
  try {
    const response = await getDetailPost(id);
    dispatch(getDetailBlogSuccess(response as PostModel));
  } catch (error) {
    dispatch(getDetailBlogFailure(`${error}`));
  }
};

// Update like
const updateLikeStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_LIKE,
  };
};

const updateLikeSuccess = (response: InteractionProps) => {
  return {
    type: ACTIONS_TYPE.UPDATE_LIKE_SUCCESS,
    payload: response.liked,
  };
};

const updateLikeFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.UPDATE_LIKE_FAILURE,
    payload: error,
  };
};

export const updateLikeAction = (id: number) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(updateLikeStart());
  try {
    const response = await updateLike(id);
    dispatch(updateLikeSuccess(response as InteractionProps));
  } catch (error) {
    dispatch(updateLikeFailure(`${error}`));
  }
};

// Get post comments
const getCommentsStart = () => {
  return {
    type: ACTIONS_TYPE.GET_COMMENTS,
  };
};

const getCommentsSuccess = (data: InteractionItemModel[]) => {
  return {
    type: ACTIONS_TYPE.GET_COMMENTS_SUCCESS,
    payload: data,
  };
};

const getCommentsFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.GET_COMMENTS_FAILURE,
    payload: message,
  };
};

export const fetchComments = (id: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getCommentsStart());
  try {
    const response = await getPostComments(id);
    dispatch(getCommentsSuccess(response as InteractionItemModel[]));
  } catch (error) {
    dispatch(getCommentsFailure(`${error}`));
  }
};

// Post comment
const postCommentStart = () => {
  return {
    type: ACTIONS_TYPE.POST_COMMENT,
  };
};

const postCommentSuccess = (data: InteractionItemModel, user: UserInfo) => {
  return {
    type: ACTIONS_TYPE.POST_COMMENT_SUCCESS,
    payload: { ...data, user: user },
  };
};

const postCommentFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.POST_COMMENT_FAILURE,
    payload: message,
  };
};

export const postCommentAction =
  (id: string, comment: string, user: UserInfo) => async (dispatch: Dispatch<RootAction>) => {
    dispatch(postCommentStart());
    try {
      const response = await postComment(id, comment);
      dispatch(postCommentSuccess(response as InteractionItemModel, user));
    } catch (error) {
      dispatch(postCommentFailure(`${error}`));
    }
  };

// Post bookmark
const postBookMarkStart = () => {
  return {
    type: ACTIONS_TYPE.POST_COMMENT,
  };
};

const postBookMarkSuccess = (id: string, res: any) => {
  return {
    type: ACTIONS_TYPE.POST_COMMENT_SUCCESS,
    payload: {id, res}
  };
};

const postBookMarkFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.POST_COMMENT_FAILURE,
    payload: message,
  };
};

export const postBookMarkAction = (id: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(postBookMarkStart());
  try {
    const response = await postBookMark(id);
    dispatch(postBookMarkSuccess(id, response) as any);
  } catch (error) {
    dispatch(postBookMarkFailure(`${error}`));
  }
};