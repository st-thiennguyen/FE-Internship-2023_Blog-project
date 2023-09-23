import { PostModel } from '../../models/post';
import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';


interface PositionImageProps {
  data: PostModel,
  isLoading: Boolean,
  isSuccess: Boolean,
  isError: Boolean,
  message: string
}

const initState: PositionImageProps = {
  data: {} as any,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

export const writePostReducer = (state = initState, action: RootAction) => {
  switch (action.type) {
    case ACTIONS_TYPE.ADD_POST:
      return {
        ...state,
        isLoading: true,
        isSuccess : false
      }

    case ACTIONS_TYPE.ADD_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        message: 'Create post success !',
        isSuccess: true,
      }

    case ACTIONS_TYPE.ADD_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: 'Create post fail !',
        isSuccess: false,
        isError: true,
      }
    default:
      return state;
  }
}
