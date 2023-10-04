import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutAction } from '../../pages/auth/auth.actions';
import { StorageKey } from '../constants';
import { getLocalStorage, isImageUrlValid } from '../utils';

import IconBookmark from '../components/icon/IconBookmark';
import IconLogout from '../components/icon/IconLogout';
import IconPost from '../components/icon/IconPost';
import IconFolder from '../components/icon/IconFolder';

import logo from '../../../assets/images/logo.svg';
import avatarDefault from '../../../assets/images/user-default.png';
import { RootState } from '../../stores/store';

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = getLocalStorage(StorageKey.ACCESS_TOKEN) ? true : false;
  const [isErrorAvatar, setIsErrorAvatar] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo)

  const handleLogout = () => {
    dispatch(logoutAction() as any);
  };

  useEffect(() => {
    isImageUrlValid(userInfo?.picture).then((value) => setIsErrorAvatar(!value));
  }, [userInfo?.picture]);

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
              {isLogin
                ? `Welcome ${userInfo.displayName || userInfo.firstName}`
                : 'Welcome to Supremethod!'}
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
                          src={!isErrorAvatar ? userInfo.picture : avatarDefault}
                          alt="avatar"
                          className="avatar-user-header"
                        />
                      </div>
                      <div className="navbar-auth">
                        <ul className="auth-list">
                          <li className="auth-item">
                            <Link to="/profile" className="auth-link auth-link-info">
                              <div className="auth-info d-flex item-center">
                                <img
                                  src={!isErrorAvatar ? userInfo.picture : avatarDefault}
                                  alt="avatar"
                                  className="avatar-user"
                                />
                                <div className="auth-info-text">
                                  <p className="auth-info-name text-truncate-1">{userInfo?.displayName}</p>
                                  <p className="auth-info-email text-truncate-1">{userInfo?.email}</p>
                                </div>
                              </div>
                            </Link>
                          </li>
                          <li className="auth-item">
                            <Link to="/posts/recyclebin" className="auth-link d-flex item-center">
                              <div className="icon icon-small">
                                <IconFolder />
                              </div>
                              <p>Recycle bin</p>
                            </Link>
                          </li>
                          <li className="auth-item">
                            <Link to="/posts/bookmark" className="auth-link d-flex item-center">
                              <div className="icon icon-small">
                                <IconBookmark />
                              </div>
                              <p>Reading list</p>
                            </Link>
                          </li>
                          <li className="auth-item">
                            <Link to="/posts/draft" className="auth-link d-flex item-center">
                              <div className="icon icon-small">
                                <IconPost />
                              </div>
                              <p>Draft</p>
                            </Link>
                          </li>
                          <li className="auth-item">
                            <Link to="/auth/login" className="auth-link d-flex item-center" onClick={handleLogout}>
                              <div className="icon icon-small">
                                <IconLogout />
                              </div>
                              <p>Log out</p>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link to="/auth/login" className="navbar-link">
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
    </header>
  );
};

export default Header;
