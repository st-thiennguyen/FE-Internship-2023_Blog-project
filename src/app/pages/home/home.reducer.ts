import { RootAction } from '../../stores/store';
import { ACTIONS_TYPE } from '../../shared/constants';
import { PostModel, PublicPostState, RecommendPostState } from '../../models/post';

const initialLastesPostState: PublicPostState = {
  data: [] as PostModel[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  currentPage: 1,
  totalPage: 0,
  totalItems: 0,
};

export const lastesPostReducer = (state = initialLastesPostState, action: RootAction): PublicPostState => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_ALL_POST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_ALL_POST_SUCCESS:
      const newPosts = action.payload.currentPage === 1 ? action.payload.data : [...state.data, ...action.payload.data];
      return {
        ...state,
        data: newPosts,
        totalPage: action.payload.totalPage,
        currentPage: action.payload.currentPage,
        totalItems: action.payload.totalItems,
        isLoading: false,
        isSuccess: true,
        message: '',
      };
    case ACTIONS_TYPE.GET_ALL_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };
    case ACTIONS_TYPE.LOAD_MORE_PUBLIC_POST:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case ACTIONS_TYPE.RESET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: 1,
      };
    default:
      return state;
  }
};

const initialRecommendPostState: RecommendPostState = {
  data: [] as PostModel[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  currentPage: 1,
  totalPage: 0,
  totalItems: 0,
};

export const recommendPostReducer = (state = initialRecommendPostState, action: RootAction): RecommendPostState => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_RECOMMEND:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_RECOMMEND_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        totalPage: action.payload.totalPage,
        totalItems: action.payload.totalItems,
        isLoading: false,
        isSuccess: true,
      };
    case ACTIONS_TYPE.GET_RECOMMEND_FAILURE:
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
