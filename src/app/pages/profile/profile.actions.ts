import { Dispatch } from 'react';

import { RootAction } from '../../stores/store';
import {
  updatePassword,
  updateProfile,
  getUserPosts,
  getUserProfile,
  updateFollow,
} from '../../shared/services/user.service';
import { UserModel, FormChangePassword, ProfileModel, FollowModel } from '../../models/user';
import { UserInfo } from '../../models/auth';
import { getEmptyImageUrl, putImageToLink } from '../../shared/services/image.service';
import { ACTIONS_TYPE, StorageKey, TypeUploadImage } from '../../shared/constants';
import { getLocalStorage } from '../../shared/utils';
import { reAssignmentAuth } from '../auth/auth.actions';
import { deletePostItem } from '../../shared/services';

const getUserProfileStart = () => {
  return {
    type: ACTIONS_TYPE.GET_PROFILE,
  };
};

const getUserProfileSuccess = (data: ProfileModel) => {
  return {
    type: ACTIONS_TYPE.GET_PROFILE_SUCCESS,
    payload: data,
  };
};

const getUserProfileFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.GET_PROFILE_FAILURE,
    payload: error,
  };
};

const getUserPostStart = () => {
  return {
    type: ACTIONS_TYPE.GET_USER_POST,
  };
};

const getUserPostSuccess = (data: ProfileModel) => {
  return {
    type: ACTIONS_TYPE.GET_USER_POST_SUCCESS,
    payload: data,
  };
};

const getUserPostFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.GET_USER_POST_FAILURE,
    payload: error,
  };
};

const updateAvatarStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_AVATAR,
  };
};

const updateAvatarSuccess = (data: string) => {
  return {
    type: ACTIONS_TYPE.UPDATE_AVATAR_SUCCESS,
    payload: data,
  };
};

const updateAvatarFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.UPDATE_AVATAR_FAILURE,
    payload: message,
  };
};

const updateProfileStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_PROFILE,
  };
};

const updateProfileSuccess = (data: UserModel) => {
  return {
    type: ACTIONS_TYPE.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};

const updateProfileFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.UPDATE_PROFILE_FAILURE,
    payload: message,
  };
};

const updatePasswordStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_PASSWORD,
  };
};

const updatePasswordStartSuccess = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_PASSWORD_SUCCESS,
  };
};

const updatePasswordStartFailure = (message: string) => {
  return {
    type: ACTIONS_TYPE.UPDATE_PASSWORD_FAILURE,
    payload: message,
  };
};

export const deletePostItemStart = () => {
  return {
    type: ACTIONS_TYPE.REMOVE_POST_ITEM,
  };
};

const deletePostItemSuccess = (id: string, res: string) => {
  return {
    type: ACTIONS_TYPE.REMOVE_POST_ITEM_SUCCESS,
    payload: { id, res },
  };
};

const deletePostItemFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.REMOVE_POST_ITEM_FAILURE,
    payload: error,
  };
};

const updateFollowStart = () => {
  return {
    type: ACTIONS_TYPE.UPDATE_FOLLOW,
  };
};

const updateFollowSuccess = (response: FollowModel) => {
  return {
    type: ACTIONS_TYPE.UPDATE_FOLLOW_SUCCESS,
    payload: response.followed,
  };
};

const updateFollowFailure = (error: string) => {
  return {
    type: ACTIONS_TYPE.UPDATE_FOLLOW_FAILURE,
    payload: error,
  };
};

export const getUserProfileAction = (id: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getUserProfileStart());
  try {
    const res = await getUserProfile(id);
    dispatch(getUserPostAction(id) as any);
    dispatch(getUserProfileSuccess(res as ProfileModel));
  } catch (error) {
    dispatch(getUserProfileFailure(`${error}`));
  }
};

export const getUserPostAction = (id: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(getUserPostStart());
  try {
    const res = await getUserPosts(id);
    dispatch(getUserPostSuccess(res as ProfileModel));
  } catch (error) {
    dispatch(getUserPostFailure(`${error}`));
  }
};

export const uploadAvatar =
  (file: File, data: Omit<UserInfo, 'id' | 'email'>) => async (dispatch: Dispatch<RootAction>) => {
    dispatch(updateAvatarStart());
    try {
      const response: any = await getEmptyImageUrl(file, TypeUploadImage.AVATAR);
      await putImageToLink(response.signedRequest, file);
      dispatch(updateAvatarSuccess(response.url));
      dispatch(updateProfileAction(data, response.url) as any);
    } catch (error) {
      dispatch(updateAvatarFailure(`${error}`));
    }
  };

export const updateProfileAction =
  (data: Omit<UserInfo, 'id' | 'email'>, picture?: string) => async (dispatch: Dispatch<RootAction>) => {
    dispatch(updateProfileStart());
    try {
      if (picture) {
        data.picture = picture;
      }
      const response = await updateProfile(data);
      dispatch(updateProfileSuccess(response as UserModel));
      const userData: UserInfo = getLocalStorage(StorageKey.USER);
      const userUpdated = response as UserModel;

      for (const key in userUpdated) {
        if (userData.hasOwnProperty(key)) {
          userData[key] = userUpdated[key];
        }
      }

      dispatch(reAssignmentAuth(userData));
    } catch (error) {
      dispatch(updateProfileFailure(`${error}`));
    }
  };

export const updatePasswordAction = (data: FormChangePassword) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(updatePasswordStart());
  try {
    await updatePassword(data);
    dispatch(updatePasswordStartSuccess());
  } catch (error) {
    dispatch(updatePasswordStartFailure(`${error}`));
  }
};

export const deletePost = (id: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(deletePostItemStart());
  try {
    const response = await deletePostItem(id);
    dispatch(deletePostItemSuccess(id, response as string));
  } catch (error) {
    dispatch(deletePostItemFailure(error as string));
  }
};

export const updateFollowAction = (id: string) => async (dispatch: Dispatch<RootAction>) => {
  dispatch(updateFollowStart());
  try {
    const response = await updateFollow(id);
    dispatch(updateFollowSuccess(response as FollowModel));
  } catch (error) {
    dispatch(updateFollowFailure(`${error}`));
  }
};
