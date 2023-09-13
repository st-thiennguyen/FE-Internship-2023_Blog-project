import React from 'react';

import logo from '../../../assets/images/logo.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-wrapper">
          <div className="footer-content d-flex flex-column item-center">
            <h2 className="footer-logo">
              <img src={logo} alt="Supremethod" />
            </h2>
            <p className="footer-subtext text-center">
              Our architecture and design blog features daily articles, news,
              interviews, and insights from leading designers and experts in the
              field. We aim to inspire, inform, and educate our readers,
              offering valuable tips, tricks, and trends to help them create
              their dream spaces.
            </p>
          </div>
          <div className="footer-copyright d-flex justify-between item-center">
            <p className="copyright">
              Copyright <a href="/">@Supremethod {new Date().getFullYear()}</a>
            </p>
            <ul className="social-list d-flex">
              <li className="social-item">
                <a
                  href="/"
                  className="social-link d-flex justify-center item-center"
                >
                  <i className="icon icon-small icon-facebook-20"></i>
                </a>
              </li>
              <li className="social-item">
                <a
                  href="/"
                  className="social-link d-flex justify-center item-center"
                >
                  <i className="icon icon-small icon-instagram-20"></i>
                </a>
              </li>
              <li className="social-item">
                <a
                  href="/"
                  className="social-link d-flex justify-center item-center"
                >
                  <i className="icon icon-small icon-twitter-20"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
