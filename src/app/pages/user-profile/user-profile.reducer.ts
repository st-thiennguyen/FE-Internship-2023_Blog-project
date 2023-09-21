import { ProfileModel } from '../../models/post';
import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';

interface ProfileStateProps {
  profile: ProfileModel;
  postList: ProfileModel;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: ProfileStateProps = {
  profile: {} as ProfileModel,
  postList: {} as ProfileModel,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
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
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.REMOVE_POST_ITEM_SUCCESS:
      const updatedPosts = state.postList.Posts.filter((post) => {
        return post.id !== (action.payload.id)
      });
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        postList: { ...state.postList , Posts : [...updatedPosts] },
        message: action.payload.res
      };
    case ACTIONS_TYPE.REMOVE_POST_ITEM_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    default:
      return state;
  }
};
