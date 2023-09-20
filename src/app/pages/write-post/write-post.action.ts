import { Dispatch } from 'react';
import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';
import { postArticles } from '../../shared/services';
import { PostModel } from '../../models/post';

export const addPostStart = () => {
  return {
    type: ACTIONS_TYPE.ADD_POST
  }
}

export const addPostSuccess = (data: any) => {
  return {
    type: ACTIONS_TYPE.ADD_POST_SUCCESS,
    payload: data
  }
}

export const addPostFailure = (error: any) => {
  return {
    type: ACTIONS_TYPE.ADD_POST_FAILURE,
    payload: error
  }
}

export const createPost = (data: PostModel) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(addPostStart());
  try {
    const res = await postArticles(data);
    dispatch(addPostSuccess(res));
  } catch (error) {
    dispatch(addPostFailure(error));
  }
}
