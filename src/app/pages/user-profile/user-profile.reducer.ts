import { RootAction } from '../../stores/store';
import ACTIONS_TYPE from '../../shared/constants/type';
import { ProfileModel } from '../../models/user';
import { PostModel } from '../../models/post';

interface ProfileStateProps {
  profile: ProfileModel;
  postList: ProfileModel;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  isDeleteSuccess?: boolean;
  isDeleteFailure?: boolean;
}
const initialState: ProfileStateProps = {
  profile: {} as ProfileModel,
  postList: {} as ProfileModel,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  isDeleteSuccess: false,
  isDeleteFailure: false,
};

export const userProfileReducer = (state = initialState, action: RootAction): ProfileStateProps => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_PROFILE:
      return {
        ...state,
        profile: {} as ProfileModel,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case ACTIONS_TYPE.GET_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    case ACTIONS_TYPE.GET_USER_POST:
      return {
        ...state,
        postList: {} as ProfileModel,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_USER_POST_SUCCESS:
      return {
        ...state,
        postList: action.payload,
        isLoading: false,
        isSuccess: false,
      };
    case ACTIONS_TYPE.GET_USER_POST:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    case ACTIONS_TYPE.REMOVE_POST_ITEM:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.REMOVE_POST_ITEM_SUCCESS:
      const updatedPosts = state.postList.Posts.filter((post: PostModel) => post.id !== (action.payload.id));
      return {
        ...state,
        isLoading: false,
        isDeleteSuccess: true,
        postList: { ...state.postList, Posts: updatedPosts },
        message: action.payload.res
      };
    case ACTIONS_TYPE.REMOVE_POST_ITEM_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isDeleteFailure: true,
        message: action.payload,
      };
    default:
      return state;
  }
};
