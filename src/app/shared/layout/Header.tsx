import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo.svg';

const Header = () => {
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
                  <a href="/" className="navbar-link">
                    <div className="navbar-content d-flex justify-center item-center">
                      <i className="icon icon-small icon-user-20"></i>
                    </div>
                  </a>
                  <div className="navbar-auth">
                    <ul className="auth-list">
                      <li className="auth-item">
                        <a href="/" className="auth-link">
                          Nguyen Si Thien
                        </a>
                      </li>
                      <li className="auth-item">
                        <a href="/" className="auth-link">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="navbar-item">
                  <a href="/" className="navbar-link">
                    <div className="navbar-content d-flex justify-center item-center">
                      <i className="icon icon-small icon-moon-20"></i>
                    </div>{' '}
                  </a>
                </li>
                <li className="navbar-item">
                  <a href="/" className="navbar-link">
                    <div className="navbar-content icon-search d-flex justify-center item-center">
                      <i className="icon icon-small icon-search-20"></i>
                    </div>{' '}
                  </a>
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
