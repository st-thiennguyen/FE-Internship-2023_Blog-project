import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';
import { PostModel } from '../../models/post';
import { InteractionItemModel } from './../../models/comment';

interface DetailStateProps {
  data: PostModel;
  likes: InteractionItemModel[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: DetailStateProps = {
  data: {} as PostModel,
  likes: [] as InteractionItemModel[],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const detailPostReducer = (state = initialState, action: RootAction): DetailStateProps => {
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

    case ACTIONS_TYPE.GET_POST_LIKES:
      return {
        ...state,
        likes: [] as InteractionItemModel[],
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_POST_LIKES_SUCCESS:
      return {
        ...state,
        likes: action.payload,
        isLoading: false,
        isSuccess: true,
        message: '',
      };
    case ACTIONS_TYPE.GET_POST_LIKES_FAILURE:
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
