import { ToastModel, ToastType } from '../../../models/toast';
import { ACTIONS_TYPE } from '../../constants';

export const showToast = (message: string, type: ToastType) => {
  const info: ToastModel = { message, type };
  return {
    type: ACTIONS_TYPE.SHOW_TOAST,
    payload: info,
  };
};

export const closeToast = () => {
  return {
    type: ACTIONS_TYPE.CLOSE_TOAST,
  };
};
