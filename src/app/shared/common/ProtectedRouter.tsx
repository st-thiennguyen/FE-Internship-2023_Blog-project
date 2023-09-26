import { Navigate } from 'react-router-dom';

import { Auth } from '../../models/auth';
import { StorageKey } from '../constants';
import { getLocalStorage } from '../utils';

const PrivateRoute = ({ children }: any) => {
  const localStorageAuth  = getLocalStorage(StorageKey.AUTH, {} as Auth);
  const accessToken = localStorageAuth?.accessToken;
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default PrivateRoute;
