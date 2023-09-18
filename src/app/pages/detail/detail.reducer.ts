import { RootAction } from '../../../stores/store';
import { PostModel } from '../../models/post';
import ACTIONS_TYPE from '../../shared/constants/type';

interface DetailStateProps {
  data: PostModel;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
const initialState: DetailStateProps = {
  data: {} as PostModel,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const detailReducer = (state = initialState, action: RootAction): DetailStateProps => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_DETAIL_BLOG:
      return {
        ...state,
        data: {} as PostModel,
        isLoading: true,
        isError: false,
        message: '',
      };
    case ACTIONS_TYPE.GET_DETAIL_BLOG_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: '',
      };
    case ACTIONS_TYPE.GET_DETAIL_BLOG_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.payload,
      };
    default:
      return state;
  }
};
