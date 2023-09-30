import { unstable_Blocker as Blocker } from 'react-router-dom';
import Modal from '../../../shared/components/Modal';

interface ConfirmNavigationProps {
  blocker: Blocker;
  handleSaveDraft: () => Promise<void>;
}

const ConfirmNavigation = ({ blocker, handleSaveDraft }: ConfirmNavigationProps) => {
  const closeModal = () => {
    blocker.reset?.();
  };

  const handleSave = () => {
    handleSaveDraft();
    blocker.proceed?.();
  };

  const handleCancel = () => {
    blocker.proceed?.();
  };

  return blocker.state === 'blocked' ? (
    <Modal onClickClose={closeModal} onClickCancel={handleCancel} onClickConfirm={handleSave} isShow={true}>
      <h4 className="modal-title">Save changes</h4>
      <p>Do you want to save this post to draft?</p>
    </Modal>
  ) : (
    <></>
  );
};

export default ConfirmNavigation;
