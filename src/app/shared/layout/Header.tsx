import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../App';
import ToastMessage from '../components/ToastMessage';

import { logoutAction } from '../../pages/auth/auth.actions';
import { RootState } from '../../stores/store';
import { StorageKey } from '../constants';
import { getLocalStorage, isImageUrlValid } from '../utils';

import logo from '../../../assets/images/logo.svg';
import icRecyclebin from '../../../assets/icons/ic-recyclebin-24.svg';
import icBookmark from '../../../assets/icons/ic-bookmark-24.svg';
import icLogout from '../../../assets/icons/ic-logout-24.svg';
import avatarDefault from '../../../assets/images/user-default.png';

const Header = () => {
  const [isShowToastMessage, setIsShowToastMessage] = useState(false);
  const isSuccess = useSelector((state: RootState) => state.auth?.isLogoutSuccess);
  const message = useSelector((state: RootState) => state.auth?.message);

  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const isLogin = getLocalStorage(StorageKey.ACCESS_TOKEN) ? true : false;
  const [isErrorCover, setIsErrorCover] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAction() as any);
    setIsShowToastMessage(!isShowToastMessage);
  };

  useEffect(() => {
    isImageUrlValid(authContext?.userInfo.picture).then((value) => setIsErrorCover(!value));
  }, [authContext?.userInfo.picture]);

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
            <span className="header-welcome">
              {isLogin ? `Welcome ${authContext.userInfo.displayName}` : 'Welcome to Supremethod !'}
            </span>
            <nav className="navbar">
              <ul className="navbar-list d-flex">
                {isLogin && (
                  <li className="navbar-item">
                    <Link to="/posts/create" className="navbar-link">
                      <div className="navbar-content d-flex justify-center item-center">
                        <i className="icon icon-small icon-write-20"></i>
                        <p className="navbar-subtext">Write</p>
                      </div>
                    </Link>
                  </li>
                )}
                <li className="navbar-item navbar-item-auth">
                  {isLogin ? (
                    <>
                      <div className="navbar-content d-flex justify-center item-center">
                        <img
                          src={!isErrorCover ? authContext.userInfo.picture : avatarDefault}
                          alt="avatar"
                          className="avatar-user-header"
                        />
                      </div>
                      <div className="navbar-auth">
                        <ul className="auth-list">
                          <li className="auth-item">
                            <Link to="/profile" className="auth-link auth-link-info">
                              <div className="auth-info d-flex item-center">
                                <img src={authContext.userInfo.picture} alt="avatar" className="avatar-user" />
                                <div className="auth-info-text">
                                  <p className="auth-info-name text-truncate-1">{authContext.userInfo?.displayName}</p>
                                  <p className="auth-info-email text-truncate-1">{authContext.userInfo?.email}</p>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li className="auth-item">
                            <Link to="/posts/recyclebin" className="auth-link d-flex item-center">
                              <img src={icRecyclebin} alt="Icon recyclebin" />
                              <p>Recycle Bin</p>
                            </Link>
                          </li>
                          <li className="auth-item">
                            <Link to="/posts/bookmark" className="auth-link d-flex item-center">
                              <img src={icBookmark} alt="Icon bookmark" />
                              <p>Bookmark</p>
                            </Link>
                          </li>
                          <li className="auth-item">
                            <Link to="/" className="auth-link d-flex item-center" onClick={handleLogout}>
                              <img src={icLogout} alt="Icon logout" />
                              <p>Logout</p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link to="/login" className="navbar-link">
                      <div className="navbar-content d-flex justify-center item-center">
                        <button className="btn btn-primary header-btn-login">Login</button>
                      </div>
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {isShowToastMessage && isSuccess && (
        <ToastMessage isShow={isSuccess} isSuccess={isSuccess} title={'success'} subtitle={message}></ToastMessage>
      )}
    </header>
  );
};

export default Header;
