interface DialogProps {
  onClickClose: () => void;
  onClickConfirm: () => void;
  onClickCancel?: () => void;
  isShow: boolean;
  children: React.ReactNode;
}

const Dialog = ({ onClickConfirm, onClickCancel, onClickClose, isShow, children }: DialogProps) => {
  return (
    <>
      <div className={`${isShow && 'overlay'}`}></div>
      <div className={isShow ? 'dialog' : 'd-hidden'}>
        <div className="dialog-confirm">
          <div className="dialog-content text-center">
            <div className="dialog-header flex-column"></div>
            <div className="dialog-body">{children}</div>
            <div className="dialog-footer d-flex justify-around">
              <button type="button" className="btn  btn-dialog" onClick={onClickCancel ? onClickCancel : onClickClose}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger " onClick={onClickConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
        <button type="button" className="close" onClick={onClickClose}>
          &times;
        </button>
      </div>
    </>
  );
};

export default Dialog;
