import { useState, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../App';
import ToastMessage from '../components/ToastMessage';
import logo from '../../../assets/images/logo.svg';
import { logoutAction } from '../../pages/auth/auth.actions';
import { isImageUrlValid } from '../utils';
import avatarDefault from '../../../assets/images/user-default.png';
import icRecyclebin from '../../../assets/icons/ic-recyclebin-24.svg';
import icBookmark from '../../../assets/icons/ic-bookmark-24.svg';
import icLogout from '../../../assets/icons/ic-logout-24.svg';

const Header = () => {
  const [isShowToastMessage, setIsShowToastMessage] = useState(false);
  const dispatch = useDispatch();

  const authContext = useContext(AuthContext);
  const isLogin = authContext?.accessToken;

  const handleLogout = (e: any) => {
    dispatch(logoutAction() as any);
    e.preventDefault();
    setIsShowToastMessage(true);
  };

  const [isErrorCover, setIsErrorCover] = useState(false);

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
                              <img src={icBookmark} alt="Icon recyclebin" />
                              <p>Bookmark</p>
                            </Link>
                          </li>
                          <li className="auth-item">
                            <Link to="/logout" className="auth-link d-flex item-center" onClick={handleLogout}>
                              <img src={icLogout} alt="Icon recyclebin" />
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
      {isShowToastMessage && (
        <ToastMessage isShow={true} isSuccess={true} title={'success'} subtitle={'Logout success!'}></ToastMessage>
      )}
    </header>
  );
};

export default Header;
