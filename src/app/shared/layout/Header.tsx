import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo.svg';
import { Auth } from '../../models/auth';
import { logoutAction } from '../../pages/auth/auth.actions';
import ToastMessage from '../components/ToastMessage';
import { StorageKey } from '../constants';
import { getLocalStorage } from '../utils';

interface HeaderProps {
  isLogin: Boolean;
  auth: Auth;
}

const Header = ({ isLogin, auth }: HeaderProps) => {
  const [isShowToastMessage, setIsShowToastMessage] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = (e: any) => {
    dispatch(logoutAction() as any);
    e.preventDefault();
    // setIsShowToastMessage(true);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapper d-flex justify-between item-center">
          <h1 className="header-logo d-flex justify-between item-center">
            <Link to="/">
              <img src={logo} alt="Supremethod" />
            </Link>
          </h1>
          <div className="header-right d-flex item-center">
            <span className="header-welcome">Welcome to Supremethod !</span>
            <nav className="navbar">
              <ul className="navbar-list d-flex">
                <li className="navbar-item">
                  <Link to="/write" className="navbar-link">
                    <div className="navbar-content d-flex justify-center item-center">
                      <i className="icon icon-small icon-write-20"></i>
                      <p className="navbar-subtext">Write</p>
                    </div>
                  </Link>
                </li>
                <li className="navbar-item navbar-item-auth">
                  <Link to="/login" className="navbar-link">
                    <div className="navbar-content d-flex justify-center item-center">
                      <i className="icon icon-small icon-user-20"></i>
                    </div>
                  </Link>
                  {isLogin ? (
                    <div className="navbar-auth">
                      <ul className="auth-list">
                        <li className="auth-item">
                          <Link to="/profile" className="auth-link">
                            {auth.userInfo?.displayName}
                          </Link>
                        </li>
                        <li className="auth-item">
                          <Link to="/logout" className="auth-link" onClick={handleLogout}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {isShowToastMessage && (
        <ToastMessage isShow={true} isSuccess={true} title={'success'} subtitle={'Logout success!'}></ToastMessage>
      )}
    </header>
  );
};

export default Header;
