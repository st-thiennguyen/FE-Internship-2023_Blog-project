import { Navigate } from 'react-router-dom';

import { Auth } from '../../models/auth';
import { StorageKey } from '../constants';
import { getLocalStorage } from '../utils';

const PrivateRoute = ({ children }: any) => {
  const localStorageToken: Auth = getLocalStorage(StorageKey.AUTH);
  if (!localStorageToken?.accessToken) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
