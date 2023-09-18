import { Link, useNavigate } from 'react-router-dom';

import logo from '../../../assets/images/logo.svg';
import { Auth } from '../../models/auth';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/action/auth';
import { getLocalStorage } from '../utils';
import { StorageKey } from '../constants';

interface HeaderProps {
  isLogin: Boolean;
  auth: Auth;
}

const Header = ({ isLogin, auth }: HeaderProps) => {

  const token: any = getLocalStorage(StorageKey.AUTH);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: any) => {
    dispatch(logoutAction(token.accessToken) as any);
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
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
                          <Link to='/' className="auth-link" onClick={handleLogout}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="navbar-auth">
                      <ul className="auth-list">
                        <li className="auth-item">
                          <Link to="/login" className="auth-link">
                            Login
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li className="navbar-item">
                  <Link to="/" className="navbar-link">
                    <div className="navbar-content d-flex justify-center item-center">
                      <i className="icon icon-small icon-moon-20"></i>
                    </div>{' '}
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/search" className="navbar-link">
                    <div className="navbar-content icon-search d-flex justify-center item-center">
                      <i className="icon icon-small icon-search-20"></i>
                    </div>{' '}
                  </Link>
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
