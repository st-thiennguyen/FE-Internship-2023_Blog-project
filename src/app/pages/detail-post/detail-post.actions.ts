import { Dispatch } from 'react';

import { PostModel } from '../../models/post';
import ACTIONS_TYPE from '../../shared/constants/type';
import { getDetailPost, getPostComments, postComment } from '../../shared/services/index';
import { RootAction } from '../../stores/store';
import { CommentItemModel } from '../../models/comment';
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

// Get post commennts
const getCommentsStart = () => {
  return {
    type: ACTIONS_TYPE.GET_COMMENTS,
  };
};

const getCommentsSuccess = (data: CommentItemModel[]) => {
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
    dispatch(getCommentsSuccess(response as CommentItemModel[]));
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

const postCommentSuccess = (data: CommentItemModel, user: UserInfo) => {
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
      dispatch(postCommentSuccess(response as CommentItemModel, user));
    } catch (error) {
      dispatch(postCommentFailure(`${error}`));
    }
  };
