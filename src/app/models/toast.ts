export enum ToastType {
  DEFAULT = 'default',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export interface ToastModel {
  message: string | '';
  type: ToastType | ToastType.DEFAULT;
}

export interface ToastState {
  infoToast: ToastModel;
  isShow: boolean;
}
