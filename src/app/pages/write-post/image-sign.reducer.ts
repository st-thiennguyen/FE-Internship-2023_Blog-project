import { ACTIONS_TYPE } from '../../shared/constants';
import { RootAction } from '../../stores/store';
import { SignatureImageState } from '../../models/post';

const initState: SignatureImageState = {
  data: {} as any,
  isLoading: false,
  isSuccess: false,
  error: '',
};

export const imageSignedReducer = (state = initState, action: RootAction) => {
  switch (action.type) {
    case ACTIONS_TYPE.GET_SIGN_URL_IMAGE_POST:
      return {
        ...state,
        isLoading: true,
      };

    case ACTIONS_TYPE.GET_SIGN_URL_IMAGE_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };

    case ACTIONS_TYPE.GET_SIGN_URL_IMAGE_POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
