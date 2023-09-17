import React, { useEffect } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';

import logo from '../../../assets/images/logo.svg';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage } from '../utils';
import { StorageKey } from '../constants';
import { logout } from '../../redux/action/auth';

const Header = () => {

  const token = getLocalStorage(StorageKey.AUTH);
  
  const dispatch = useDispatch();

  const handleLogout = (e: any) => {
    
    dispatch(logout(token) as any);
    e.preventDefault();
    localStorage.clear();
    if (!token) {
      redirect('/login');
    }
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
                  <div className="navbar-auth">
                    <ul className="auth-list">
                      <li className="auth-item">
                        <Link to="/profile" className="auth-link">
                          Nguyen Si Thien
                        </Link>
                      </li>
                      <li className="auth-item">
                        <Link to='/login' className="auth-link" onClick={handleLogout}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
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
