import { useState } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../../../assets/images/logo.png';
import loginImg from '../../../../assets/images/bg-auth.png';
import icGoogle from '../../../../assets/icons/ic-google-30.svg';
import icFacebook from '../../../../assets/icons/ic-facebook-30.svg';
import icGithub from '../../../../assets/icons/ic-github-30.svg';
import icEye from '../../../../assets/icons/ic-eye-10.svg';
import icEyeSlash from '../../../../assets/icons/ic-eye_slash-10.svg';


const Login = () => {

  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const togglePassword = () => {
    setIsPasswordShow(!isPasswordShow);
  }

  return (
    <div className="auth">
      <div className="auth-wrapper row">
        <div className="auth-body col col-6 col-sm-12">
          <h1 className='logo'>
            <Link to="/">
              <img className="logo-img" src={logoImg} alt="image logo Supremethod" />
            </Link>
          </h1>
          <h2 className="auth-title text-center">LOGIN</h2>
          <ul className="login-external-list row text-center">
            <li className="login-external-item col col-4">
              <a href="" className="external-item-link">
                <img src={icGoogle} alt="icon google" className="login-icon icon-google" />
              </a>
            </li>
            <li className="login-external-item col col-4">
              <a href="" className="external-item-link">
                <img src={icFacebook} alt="icon facebook" className="login-icon icon-facebook" />
              </a>
            </li>
            <li className="login-external-item col col-4">
              <a href="" className="external-item-link">
                <img src={icGithub} alt="icon github" className="login-icon icon-github" />
              </a>
            </li>
          </ul>
          <form action="" className="form login-form">
            <div className="form-input-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input className="input-email form-input" id="email" type="text" placeholder="Enter Email..." />
            </div>
            <div className="form-input-group">
              <label htmlFor="password" className="form-label">Passsword</label>
              <div className="input-password-group">
                <input className="input-password form-input" id="password" type={isPasswordShow ? "text" : "password"} placeholder="Enter Password..." />
                <img src={isPasswordShow ? icEyeSlash : icEye} alt="icon eye" className="login-icon icon-eye text-center" onClick={togglePassword} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-auth">login</button>
          </form>
          <p className="text-center">You"re new to Supremethod? <Link to="/register" className="register-link">Register</Link></p>
        </div>
        <div className="auth-bg col col-6">
          <img src={loginImg} alt="image login" className="auth-img" />
        </div>
      </div>
    </div>
  );
}

export default Login;
