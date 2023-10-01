import { unstable_Blocker as Blocker } from 'react-router-dom';
import Dialog from '../../../shared/components/Dialog';

interface ConfirmNavigationProps {
  blocker: Blocker;
  handleSaveDraft: () => Promise<void>;
}

const ConfirmNavigation = ({ blocker, handleSaveDraft }: ConfirmNavigationProps) => {
  const closeDialog = () => {
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
    <Dialog onClickClose={closeDialog} onClickCancel={handleCancel} onClickConfirm={handleSave} isShow={true}>
      <h4 className="dialog-title">Save changes</h4>
      <p>Do you want to save this post to draft?</p>
    </Dialog>
  ) : (
    <></>
  );
};

export default ConfirmNavigation;
