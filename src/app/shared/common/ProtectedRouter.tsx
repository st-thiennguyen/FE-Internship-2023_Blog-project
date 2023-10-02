import { Navigate } from 'react-router-dom';

import { StorageKey } from '../constants';
import { getLocalStorage } from '../utils';

const PrivateRoute = ({ children }: any) => {
  const isLogin  = getLocalStorage(StorageKey.ACCESS_TOKEN, '');
  if (!isLogin) {
    return <Navigate to="/auth/login" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
