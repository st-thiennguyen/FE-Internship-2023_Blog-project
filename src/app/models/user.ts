import { UserInfo } from './auth';
import { PostModel } from './post';

export interface UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  dob: string;
  displayName: string;
  picture: string;
  followers: number;
  followings: number;
  [key: string]: any;
}

export interface FormChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface ProfileModel extends UserModel {
  isFollowed: boolean;
  posts: PostModel[];
}

export interface FollowModel {
  followed: boolean;
}

export interface UserState {
  data: UserModel[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

export interface ProfileState {
  data: ProfileModel;
  followers: UserInfo[];
  following: UserInfo[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLoadingFollow: boolean;
  message: string;
  isDeleteSuccess?: boolean;
  isDeleteFailure?: boolean;
}
