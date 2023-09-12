import { useState } from 'react';
import { Link } from 'react-router-dom';

import bg from '../../../../assets/images/bg-auth.png';
import logo from '../../../../assets/images/logo.png';

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const togglePassword = (): void => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-wrapper row justify-between">
        <div className="auth-body col col-6 col-sm-12">
          <h1 className="logo">
            <Link to="/">
              <img className="logo-img" src={logo} alt="supremethod" />
            </Link>
          </h1>
          <h2 className="auth-title text-center">REGISTER</h2>
          <form className="form form-register" action="">
            <div className="row">
              <div className="col col-6">
                <label className="form-label">First Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter first name..."
                />
              </div>
              <div className="col col-6">
                <label className="form-label">Last Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter last name..."
                />
              </div>
            </div>
            <label className="form-label">Display name</label>
            <input
              className="form-input"
              type="text"
              placeholder="Enter display name..."
            />
            <div className="row">
              <div className="col col-6">
                <label className="form-label">Date of birth</label>
                <input className="form-input" type="date" />
              </div>
              <div className="col col-6">
                <label className="form-label">Gender</label>
                <select className="form-select" defaultValue={''}>
                  <option disabled value="">
                    -- Chose your gender --
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <label className="form-label">Phone number</label>
            <input
              className="form-input"
              type="tel"
              placeholder="Enter phone number..."
            />
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="Enter email..."
            />
            <label className="form-label">Password</label>
            <div className="input-password-group">
              <input
                className="form-input"
                type={isShowPassword ? 'text' : 'password'}
                name=""
                placeholder="Enter password..."
              />
              {isShowPassword ? (
                <i
                  onClick={togglePassword}
                  className="icon icon-eye-slash icon-password"
                ></i>
              ) : (
                <i
                  onClick={togglePassword}
                  className="icon icon-eye icon-password"
                ></i>
              )}
            </div>
            <button className="btn btn-primary btn-auth" type="submit">
              Register
            </button>
            <p className="text-center">
              Already had an account?
              <Link className="login-link" to="/login">
                {' '}
                Login
              </Link>
            </p>
          </form>
        </div>
        <div className="auth-bg col col-6">
          <img className="auth-img" src={bg} alt="Auth background" />
        </div>
      </div>
    </div>
  );
};

export default Register;
