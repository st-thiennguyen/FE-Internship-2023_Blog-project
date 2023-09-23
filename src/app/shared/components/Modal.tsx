interface ModalProps {
  onClickClose: () => void, 
  onClickConfirm: () => void,
  isShow: boolean,
  children: React.ReactNode;
}

const Modal = ({onClickConfirm, onClickClose, isShow , children}: ModalProps) => {

  return (
    <>
      <div className={`${isShow && 'overplay'}`}></div>
      <div className={`${isShow ? 'modal': 'hide-modal'}`}>
        <div className="modal-confirm">
          <div className="modal-content text-center">
            <div className="modal-header flex-column">
              <button type="button" className="close" aria-hidden="true" onClick={onClickClose}>&times;</button>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-secondary btn-modal" onClick={onClickClose}>Cancel</button>
              <button type="button" className="btn btn-danger btn-modal" onClick={onClickConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;
