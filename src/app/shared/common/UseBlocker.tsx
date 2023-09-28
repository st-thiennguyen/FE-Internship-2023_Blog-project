import { Blocker, History } from 'history';
import { useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext, Navigator } from 'react-router-dom';

export const useBlocker = (blocker: Blocker, when = true) => {
  const { navigator } = useContext(NavigationContext);
  useEffect(() => {
    if (!when) {
      return;
    }

    const unblock = (navigator as Navigator & Pick<History, 'block'>).block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
};
