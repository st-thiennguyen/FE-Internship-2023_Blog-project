import { Link } from 'react-router-dom';

import logo from '../../../assets/images/logo.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-wrapper">
          <div className="footer-content d-flex justify-between item-center">
            <div className="footer-content">
              <h2 className="footer-logo">
                <a href="/">
                  <img src={logo} alt="Supremethod" />
                </a>
              </h2>
              <p className="footer-subtext">
                Our architecture and design blog features daily articles, news, interviews, and insights from leading
                designers and experts in the field. We aim to inspire, inform, and educate our readers, offering
                valuable tips, tricks, and trends to help them create their dream spaces.
              </p>
            </div>
            <div className="footer-info d-flex flex-column ">
              <h4 className="footer-info-title">Information</h4>
              <ul className="footer-info-list">
                <li className="footer-info-item">
                  <a href="#" className="footer-link">
                    About Us
                  </a>
                </li>
                <li className="footer-info-item">
                  <a href="#" className="footer-link">
                    Privacy Policy
                  </a>
                </li>
                <li className="footer-info-item">
                  <a href="#" className="footer-link">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-info d-flex flex-column ">
              <h4 className="footer-info-title">Contacts</h4>
              <ul className="footer-info-list">
                <li className="footer-info-item">
                  <a className="footer-link" href="tel:+0123456789">
                    +0123 456 789
                  </a>
                </li>
                <li className="footer-info-item">
                  <a className="footer-link" href="mailto:supremethod@mail.com">
                    supremethod@mail.com
                  </a>
                </li>
                <li className="footer-info-item">363 Nguyen Huu Tho, Da Nang</li>
              </ul>
            </div>
          </div>

          <div className="footer-copyright d-flex justify-between item-center">
            <p className="copyright">
              Copyright <Link to="/">@Supremethod {new Date().getFullYear()}</Link>
            </p>
            <ul className="social-list d-flex">
              <li className="social-item">
                <Link to="/" className="social-link d-flex justify-center item-center">
                  <i className="icon icon-small icon-facebook-20"></i>
                </Link>
              </li>
              <li className="social-item">
                <Link to="/" className="social-link d-flex justify-center item-center">
                  <i className="icon icon-small icon-instagram-20"></i>
                </Link>
              </li>
              <li className="social-item">
                <Link to="/" className="social-link d-flex justify-center item-center">
                  <i className="icon icon-small icon-twitter-20"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
