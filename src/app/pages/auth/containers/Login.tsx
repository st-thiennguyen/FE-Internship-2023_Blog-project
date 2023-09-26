import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { StorageKey, regexEmail } from '../../../shared/constants';
import { RootState } from '../../../stores/store';
import { loginAction, registerReset } from '../auth.actions';
import { AuthContext } from '../../../App';

import Button from '../../../shared/components/Button';
import ToastMessage from '../../../shared/components/ToastMessage';

import icEye from '../../../../assets/icons/ic-eye-10.svg';
import icEyeSlash from '../../../../assets/icons/ic-eye_slash-10.svg';
import icFacebook from '../../../../assets/icons/ic-facebook-30.svg';
import icGithub from '../../../../assets/icons/ic-github-30.svg';
import icGoogle from '../../../../assets/icons/ic-google-30.svg';
import loginImg from '../../../../assets/images/bg-auth.png';
import logoImg from '../../../../assets/images/logo.png';
import { getLocalStorage } from '../../../shared/utils';

const schema = yup
  .object({
    email: yup.string().trim().required('Email must not be null!').matches(regexEmail, 'Email invalid!'),
    password: yup
      .string()
      .trim()
      .required('Password must not be null!')
      .max(40, 'Password must not be more than 40 characters!')
      .min(4, 'Password must not be less than 4 characters!'),
  })
  .required();

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localStorageAuth: any = getLocalStorage(StorageKey.AUTH) || null;
  const isLogin = localStorageAuth?.accessToken;
  const [isShowPassword, setIsShowPassword] = useState(false);

  const isLoading: boolean = useSelector((state: RootState) => state.auth.isLoading);
  const message: string = useSelector((state: RootState) => state.auth.message);
  const isErrorLogin: any = useSelector((state: RootState) => state.auth.isError);

  const isRegisterSuccess: boolean = useSelector((state: RootState) => state.auth.isSuccess);
  const registerMessage: string = useSelector((state: RootState) => state.auth.message);

  const togglePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  const [registerState] = useState({
    isRegisterSuccess,
    registerMessage,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) => {
    dispatch(loginAction(data.email, data.password) as any);
  });

  const removeStateRegister = useRef(() => { });
  
  removeStateRegister.current = () => {
    isRegisterSuccess && dispatch(registerReset());
  };

  useEffect(() => {
    if (isLogin) {
      removeStateRegister.current();
      navigate('/');
    }
  }, [isLogin]);

  return (
    <div className="auth">
      <div className="auth-wrapper row">
        <div className="auth-body col col-6 col-sm-12">
          <h1 className="logo">
            <Link to="/" className={isLoading ? 'disable-link' : ''}>
              <img className="logo-img" src={logoImg} alt="Supremethod" />
            </Link>
          </h1>
          <h2 className="auth-title text-center">LOGIN</h2>
          <ul className="login-external-list row text-center">
            <li className="login-external-item col col-4">
              <a href="/" className="external-item-link">
                <img src={icGoogle} alt="icon google" className="login-icon icon-google" />
              </a>
            </li>
            <li className="login-external-item col col-4">
              <a href="/" className="external-item-link">
                <img src={icFacebook} alt="icon facebook" className="login-icon icon-facebook" />
              </a>
            </li>
            <li className="login-external-item col col-4">
              <a href="/" className="external-item-link">
                <img src={icGithub} alt="icon github" className="login-icon icon-github" />
              </a>
            </li>
          </ul>
          <form className="form login-form" onSubmit={onSubmit}>
            <fieldset className="form-fieldset" disabled={isLoading}>
              <div className="form-input-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  {...register('email')}
                  className="input-email form-input"
                  id="email"
                  type="text"
                  placeholder="Enter Email..."
                />
                <p className="form-error">{errors.email?.message}</p>
              </div>
              <div className="form-input-group">
                <label htmlFor="password" className="form-label">
                  Passsword
                </label>
                <div className="input-password-group">
                  <input
                    {...register('password')}
                    className="input-password form-input"
                    id="password"
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="Enter Password..."
                  />
                  <img
                    src={isShowPassword ? icEyeSlash : icEye}
                    alt="icon eye"
                    className="login-icon icon-eye text-center"
                    onClick={togglePassword}
                  />
                  <p className="form-error">{errors.password?.message}</p>
                </div>
              </div>
              <Button label="login" isLoading={isLoading} optionClassName="btn-primary btn-auth" />
            </fieldset>
          </form>
          <p className="text-center">
            You"re new to Supremethod?{' '}
            <Link to="/register" className={`register-link ${isLoading ? 'disable-link' : ''}`}>
              Register
            </Link>
          </p>
        </div>
        <div className="auth-bg col col-6">
          <img src={loginImg} alt="background login" className="auth-img" />
        </div>
      </div>
      {
        registerState.isRegisterSuccess && (
          <ToastMessage
            isShow={registerState.isRegisterSuccess}
            isSuccess={registerState.isRegisterSuccess}
            title={'Success'}
            subtitle={registerState.registerMessage}
          />
        )
      }
      {
        isErrorLogin && (
          <ToastMessage
            isShow={isErrorLogin}
            isSuccess={!isErrorLogin}
            title={'Error'}
            subtitle={message}
          />
        )
      }
    </div>
  );
};

export default Login;
