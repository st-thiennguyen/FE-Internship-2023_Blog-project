interface ModalProps {
  onClickCancel: () => void, 
  onClickDelete: () => void,
  isShow: boolean,
}

const Modal = ({onClickDelete, onClickCancel, isShow}: ModalProps) => {

  return (
    <>
      <div className={`${isShow && "overplay"}`}></div>
      <div className={`${isShow ? 'modal': 'hide-modal'}`}>
        <div className="modal-confirm">
          <div className="modal-content">
            <div className="modal-header flex-column">
              <h4 className="modal-title w-100">Are you sure?</h4>
              <button type="button" className="close" aria-hidden="true" onClick={onClickCancel}>&times;</button>
            </div>
            <div className="modal-body">
              <p>Do you really want to delete?</p>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-secondary" onClick={onClickCancel}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={onClickDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;
