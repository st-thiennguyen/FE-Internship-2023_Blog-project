import { Navigate } from 'react-router-dom';

import { StorageKey } from '../constants';
import { getLocalStorage } from '../utils';

const PrivateRoute = ({ children }: any) => {
  const accessToken  = getLocalStorage(StorageKey.ACCESS_TOKEN, '');
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
