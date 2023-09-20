import { PositionImageModel } from '../../models/post';
import ACTIONS_TYPE from '../../shared/constants/type';
import { RootAction } from '../../stores/store';


interface PositionImageProps {
  file: PositionImageModel,
  isLoading: boolean,
  isSuccess: boolean,
  error: string
}

const initState: PositionImageProps = {
  file: {} as any,
  isLoading: false,
  isSuccess: false,
  error: ''
}

export const imageSignedReducer = (state = initState, action: RootAction) => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_SIGN_URL_IMAGE_POST:
      return {
        ...state,
        isLoading: true,
      }

    case ACTIONS_TYPE.GET_SIGN_URL_IMAGE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        file: action.payload
      }

    case ACTIONS_TYPE.GET_SIGN_URL_IMAGE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state;
  }
}
