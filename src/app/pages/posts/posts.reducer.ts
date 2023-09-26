import { PostModel, PublicPostState } from '../../models/post';
import { ACTIONS_TYPE } from '../../shared/constants';
import { RootAction } from '../../stores/store';

const initialPostsState: PublicPostState = {
  data: [] as PostModel[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  currentPage: 1,
  totalPage: 0,
  totalItems: 0,
};

export const postTagReducer = (state = initialPostsState, action: RootAction): PublicPostState => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_POST_WITH_TAG:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_POST_WITH_TAG_SUCCESS:
      const newPosts = action.payload.currentPage === 1 ? action.payload.data : [...state.data, ...action.payload.data];
      return {
        ...state,
        data: newPosts,
        totalPage: action.payload.totalPage,
        totalItems: action.payload.totalItems,
        isLoading: false,
        isSuccess: true,
        message: '',
      };
    case ACTIONS_TYPE.GET_POST_WITH_TAG_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    case ACTIONS_TYPE.LOAD_MORE_POST_WITH_TAGS:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case ACTIONS_TYPE.RESET_CURRENT_PAGE_POST_WITH_TAG:
      return {
        ...state,
        currentPage: 1,
      };

    case ACTIONS_TYPE.GET_RECYCLEBIN:
      return {
        ...state,
        data: action.payload === 1 ? [] : state.data,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };

    case ACTIONS_TYPE.GET_RECYCLEBIN_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload],
        totalPage: action.payload.totalPage,
        totalItems: action.payload.totalItems,
        isLoading: false,
        isSuccess: true,
        message: '',
      };

    case ACTIONS_TYPE.GET_RECYCLEBIN_FAILURE:
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
