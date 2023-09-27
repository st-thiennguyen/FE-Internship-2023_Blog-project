import { ToastModel, ToastState } from '../../../models/toast';
import { RootAction } from '../../../stores/store';
import { ACTIONS_TYPE } from '../../constants';

const initialState: ToastState = {
  infoToast: {} as ToastModel,
  isShow: false,
};

const toastReducer = (state = initialState, action: RootAction): ToastState => {
  switch (action.type) {
    case ACTIONS_TYPE.SHOW_TOAST:
      return {
        ...state,
        infoToast: action.payload,
        isShow: true,
      };

    case ACTIONS_TYPE.CLOSE_TOAST:
      return {
        ...state,
        infoToast: {} as ToastModel,
        isShow: false,
      };

    default:
      return state;
  }
};

export default toastReducer;
