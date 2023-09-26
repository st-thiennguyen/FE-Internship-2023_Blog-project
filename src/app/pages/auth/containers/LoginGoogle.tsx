import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setLocalStorage } from '../../../shared/utils';
import { StorageKey } from '../../../shared/constants';
import { getUserProfile } from '../../../shared/services/user.service';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../auth.actions';

const LoginGoogle = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = searchParams.get('accessToken');
  const getUser = async () => {
    const userInfo = await getUserProfile('me');

    dispatch(loginSuccess({ accessToken, userInfo }));
  };
  useEffect(() => {
    if (accessToken) {
      console.log('ACCESS', accessToken);
      setLocalStorage(StorageKey.AUTH, {
        accessToken,
      });
      getUser();

      navigate('/');
    }
  }, []);

  return <></>;
};

export default LoginGoogle;
