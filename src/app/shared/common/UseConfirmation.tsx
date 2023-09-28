import { useState } from 'react';

const callback = () => {};

const initialConfirmState = {
  isOpen: false,
  hasConfirmed: false,
  proceed: callback,
  cancel: callback,
};

const UseConfirmation = () => {
  const [confirm, setConfirm] = useState(initialConfirmState);

  const onConfirm = () => {
    const promise = new Promise((resolve, reject) => {
      setConfirm((state) => ({
        ...state,
        isOpen: true,
        proceed: () => resolve,
        cancel: () => reject,
      }));
    });

    return promise
      .then(() => {
        setConfirm({ ...confirm, isOpen: false, hasConfirmed: true });
        return true;
      })
      .catch(() => {
        setConfirm({ ...confirm, isOpen: false });
        return false;
      });
  };

  const resetConfirmation = () => setConfirm(initialConfirmState);

  return {
    ...confirm,
    onConfirm,
    resetConfirmation,
  };
};

export default UseConfirmation;
