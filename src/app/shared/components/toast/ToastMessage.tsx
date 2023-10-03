import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeToast } from './toast.actions';
import { RootState } from '../../../stores/store';
import { ToastModel } from '../../../models/toast';

const ToastMessage = () => {
  const isShow = useSelector((state: RootState) => state.toast.isShow);
  const info: ToastModel = useSelector((state: RootState) => state.toast.infoToast);
  const closeClick = useRef(() => {});

  const dispatch = useDispatch();

  closeClick.current = () => {
    dispatch(closeToast());
  };

  useEffect(() => {
    if (isShow) {
      setTimeout(() => {
        closeClick.current();
      }, 4000);
    }
  }, [isShow]);

  return (
    <div className={`toast ${isShow && 'show'} ${info.type}`}>
      <div className="toast-wrapper d-flex justify-between item-center">
        <div className="toast-content d-flex item-center">
          <div className="toast-icon">
            <i className="icon icon-toast"></i>
          </div>
          <div className="toast-body">
            <h5 className="toast-title">{info.type}</h5>
            <p className="toast-subtext">{info.message}</p>
          </div>
        </div>
        <button className="btn btn-toast-close" onClick={closeClick.current}>
          <i className="icon icon-toast-close icon-close-10"></i>
        </button>
      </div>
    </div>
  );
};

export default ToastMessage;
