import { Dispatch } from 'react';
import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';
import { ApiService, UploadUrlImagePost, getResizeUrlImage } from '../../shared/services';
import { PositionImageModel } from '../../models/post';


export const getSignUrlImagePostStart = () => {
  return {
    type: ACTIONS_TYPE.GET_SIGN_URL_IMAGE_POST
  }
}

export const getSignUrlImagePostSuccess = (data: PositionImageModel) => {
  return {
    type: ACTIONS_TYPE.GET_SIGN_URL_IMAGE_POST_SUCCESS,
    payload: data
  }
}

export const getSignUrlImagePostFailure = (error: any) => {
  return {
    type: ACTIONS_TYPE.GET_SIGN_URL_IMAGE_POST_FAILURE,
    payload: error
  }
}

export const fetchResizeUrlImage = (file: any) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getSignUrlImagePostStart());
  try {
    const response: any = await getResizeUrlImage(file)
    dispatch(getSignUrlImagePostSuccess(response))
    UploadUrlImagePost(response.signedRequest, file)
  } catch (error) {
    dispatch(getSignUrlImagePostFailure(error))
  }
}



