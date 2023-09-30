import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { setLocalStorage } from '../../../shared/utils';
import { StorageKey } from '../../../shared/constants';
import { getUserProfile } from '../../../shared/services/user.service';
import { loginSuccess } from '../auth.actions';
import { parseJwt } from '../../../shared/utils/jwt';
import { UserInfo } from '../../../models/auth';

const LoginGoogle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const accessToken = searchParams.get('accessToken');

  const jwt = accessToken && parseJwt(`${accessToken}`);
  const userId = jwt?.userId;

  const getUser = async () => {
    const user = await getUserProfile('me');
    dispatch(loginSuccess({ accessToken, userInfo: { id: userId, ...(user as Omit<UserInfo, 'id'>) } }));
  };

  useEffect(() => {
    if (!accessToken) {
      navigate('/');
    } else {
      setLocalStorage(StorageKey.ACCESS_TOKEN, accessToken);
      getUser();

      navigate('/');
    }
  }, []);

  return <></>;
};

export default LoginGoogle;
