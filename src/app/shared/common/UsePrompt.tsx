import React, { useCallback } from 'react';
import UseConfirmation from './UseConfirmation';
import { useBlocker } from './UseBlocker';
import Modal from '../components/Modal';

interface usePromptProps {
  when: boolean;
  message: string;
}
const UsePrompt = ({ when = true, message }: usePromptProps) => {
  const { isOpen, proceed, cancel, onConfirm, hasConfirmed, resetConfirmation } = UseConfirmation();

  let blocker = useCallback(
    async (tx: any) => {
      if (await onConfirm()) {
        resetConfirmation();
        tx.retry();
      }
    },
    [resetConfirmation, onConfirm],
  );

  useBlocker(blocker, when && !hasConfirmed);
  return (
    <Modal onClickClose={cancel} onClickConfirm={proceed} isShow={isOpen}>
      <h4 className="modal-title">Save Draft</h4>
      <p>{message}</p>
    </Modal>
  );
};

export default UsePrompt;
