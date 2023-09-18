import { useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../App';
import { logoutAction } from '../../redux/action/auth';
import ToastMessage from '../components/ToastMessage';
import logo from '../../../assets/images/logo.svg';

const Header = () => {

  const [isShowToastMessage, setIsShowToastMessage] = useState(false);
  const dispatch = useDispatch();

  const authContext = useContext(AuthContext)
  const isLogin = authContext?.accessToken;

  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(logoutAction(isLogin) as any);
    setIsShowToastMessage(true);
  }

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
            <span className="header-welcome">{isLogin ? `Welcome ${authContext.userInfo.displayName}` : 'Welcome to Supremethod !'}</span>
            <nav className="navbar">
              <ul className="navbar-list d-flex">
                {
                  isLogin ? (<li className="navbar-item">
                    <Link to="/write" className="navbar-link">
                      <div className="navbar-content d-flex justify-center item-center">
                        <i className="icon icon-small icon-write-20"></i>
                        <p className="navbar-subtext">Write</p>
                      </div>
                    </Link>
                  </li>) : null
                }
                <li className="navbar-item navbar-item-auth">
                  {isLogin ? (
                    <>
                      <Link to="/login" className="navbar-link">
                        <div className="navbar-content d-flex justify-center item-center">
                          <img src={authContext.userInfo.picture} alt="" className='icon icon-small avatar-user' />
                        </div>
                      </Link>
                      <div className="navbar-auth">
                        <ul className="auth-list">
                          <li className="auth-item">
                            <Link to="/profile" className="auth-link">
                              {authContext.userInfo?.displayName}
                            </Link>
                          </li>
                          <li className="auth-item">
                            <Link to='/' className="auth-link" onClick={handleLogout}>
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div></>
                  ) : (
                    <Link to="/login" className="navbar-link">
                      <div className="navbar-content d-flex justify-center item-center">
                        <i className="icon icon-small icon-user-20"></i>
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
