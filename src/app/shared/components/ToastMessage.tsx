import { useEffect, useRef, useState } from 'react';

type ToastMessageProps = {
  isShow: Boolean;
  isSuccess: Boolean;
  title: string;
  subtitle: string;
  onClose?: () => void;
};

const ToastMessage = ({ isShow, isSuccess, title, subtitle, onClose }: ToastMessageProps) => {
  const [isShowToast, setIsShowToast] = useState(isShow);
  const closeClick = useRef(() => {});

  closeClick.current = () => {
    if (isShowToast) {
      setIsShowToast(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      closeClick.current();
      onClose && onClose();
    }, 4000);
  }, []);

  return (
    <div className={`toast ${isShowToast && 'show'} ${isSuccess ? 'success' : 'error'}`}>
      <div className="toast-wrapper d-flex justify-between item-center">
        <div className="toast-content d-flex item-center">
          <div className="toast-icon">
            <i className="icon icon-toast"></i>
          </div>
          <div className="toast-body">
            <h5 className="toast-title">{title}</h5>
            <p className="toast-subtext">{subtitle}</p>
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
