import { RootAction } from '../../stores/store';
import { BookmarkModel, DetailState, PostModel } from '../../models/post';
import { InteractionItemModel } from '../../models/interaction';
import { ACTIONS_TYPE } from '../../shared/constants';

const initialState: DetailState = {
  data: {} as PostModel,
  comments: [] as InteractionItemModel[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const detailPostReducer = (state = initialState, action: RootAction): DetailState => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_DETAIL_BLOG:
      return {
        ...state,
        data: {} as PostModel,
        isSuccess: false,
        isLoading: true,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_DETAIL_BLOG_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
        message: '',
      };
    case ACTIONS_TYPE.GET_DETAIL_BLOG_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };

    // update like
    case ACTIONS_TYPE.UPDATE_LIKE:
      return {
        ...state,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.UPDATE_LIKE_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          isLiked: action.payload,
          likes: action.payload ? state.data?.likes + 1 : state.data?.likes - 1,
        },
        isLoading: false,
        isSuccess: true,
      };
    case ACTIONS_TYPE.UPDATE_LIKE_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };

    // Get comments
    case ACTIONS_TYPE.GET_COMMENTS:
      return {
        ...state,
        comments: [] as InteractionItemModel[],
        isSuccess: false,
        isLoading: true,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case ACTIONS_TYPE.GET_COMMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      };

    // Post comment
    case ACTIONS_TYPE.POST_COMMENT:
      return {
        ...state,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.POST_COMMENT_SUCCESS:
      return {
        ...state,
        data: { ...state.data, comments: state.data?.comments + 1 },
        comments: [action.payload, ...state.comments],
        isLoading: false,
        isSuccess: true,
      };
    case ACTIONS_TYPE.POST_COMMENT_FAILURE:
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

interface BookmarkState {
  data: BookmarkModel[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
const initialBookMarkState: BookmarkState = {
  data: [] as BookmarkModel[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const bookmarkReducer = (state = initialBookMarkState, action: RootAction): BookmarkState => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_BOOKMARK:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_BOOKMARK_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isSuccess: true,
      };
    case ACTIONS_TYPE.GET_BOOKMARK_FAILURE:
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
