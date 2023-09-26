import { Dispatch } from 'react';
import { RootAction } from '../../stores/store';
import { SignatureImageModel } from '../../models/post';
import { ACTIONS_TYPE, TypeUploadImage } from '../../shared/constants';
import { getEmptyImageUrl, putImageToLink } from '../../shared/services/image.service';

export const getSignUrlImagePostStart = () => {
  return {
    type: ACTIONS_TYPE.GET_SIGN_URL_IMAGE_POST,
  };
};

export const getSignUrlImagePostSuccess = (data: SignatureImageModel) => {
  return {
    type: ACTIONS_TYPE.GET_SIGN_URL_IMAGE_POST_SUCCESS,
    payload: data,
  };
};

export const getSignUrlImagePostFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.GET_SIGN_URL_IMAGE_POST_FAILURE,
    payload: error,
  };
};

export const fetchSignUrlImage = (file: File) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getSignUrlImagePostStart());
  try {
    const response: any = await getEmptyImageUrl(file, TypeUploadImage.COVER_POST);
    dispatch(getSignUrlImagePostSuccess(response));
    putImageToLink(response.signedRequest, file);
  } catch (error) {
    dispatch(getSignUrlImagePostFailure(`${error}`));
  }
};
