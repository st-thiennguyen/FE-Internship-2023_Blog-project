import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { registerAccount } from '../../../redux/action/auth';
import { RootState } from '../../../redux/store';
import { Gender, regexEmail, regexPhoneNumber } from '../../../shared/constants';
import { convertDateFormat } from '../../../shared/utils/dateFormat';

const schema = yup
  .object({
    firstName: yup.string().trim('Whitespace').required('First Name must not be null'),
    lastName: yup.string().trim().required('Last Name must not be null'),
    displayName: yup.string().trim().required('Display Name must not be null'),
    gender: yup
      .mixed<Gender>()
      .oneOf(Object.values(Gender), 'Gender must be male/female/other')
      .required('Gender must not be null'),
    dob: yup
      .date()
      .transform((value, originalValue) => {
        if (originalValue === '') return null;
        return value;
      })
      .max(new Date(), 'Date of birth must be in the past')
      .required('Date of birth must not be null'),
    phoneNumber: yup
      .string()
      .trim()
      .matches(regexPhoneNumber, 'Invalid phone number')
      .required('Phone number must not be null'),
    email: yup.string().trim().matches(regexEmail, 'Invalid email address').required('Email must not be null'),
    password: yup
      .string()
      .min(4, '')
      .max(40, 'Password must be less than 40 characters')
      .required('Password must not be null'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const Register = () => {
  const isLoading = useSelector((state: RootState) => state.register.isLoading);
  const message = useSelector((state: RootState) => state.register.message);
  const error = useSelector((state: RootState) => state.register.error);
  const dispatch = useDispatch();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const myFieldset = document.getElementById('form-fieldset');

  const togglePassword = (): void => {
    setIsShowPassword(!isShowPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handlePictureByGender = (gender: Gender) => {
    switch (gender) {
      case Gender.MALE:
        return 'https://robohash.org/voluptasautvoluptatem.png?size=50x50&set=set1';
      case Gender.FEMALE:
        return 'https://robohash.org/consecteturdolorquia.png?size=50x50&set=set1';
      default:
        return 'https://robohash.org/illumetest.png?size=50x50&set=set1';
    }
  };

  const onRegister = (data: FormData) => {
    registerAccount(
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        password: data.password,
        dob: convertDateFormat(data.dob),
        phone: data.phoneNumber,
        displayName: data.displayName,
        picture: handlePictureByGender(data.gender),
      },
      dispatch,
    );
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-wrapper row justify-between">
        <div className="auth-body col col-6 col-sm-12">
          <header className="logo-wrapper">
            <h1 className="logo">
              <Link to="/" className={isLoading ? 'disable-link' : ''}>
                <img className="logo-img" src={require('../../../../assets/images/logo.png')} alt="supremethod" />
              </Link>
            </h1>
          </header>
          <h2 className="auth-title text-center">REGISTER</h2>
          <form className="form form-register" onSubmit={handleSubmit(onRegister)}>
            <fieldset className="form-fieldset" disabled={isLoading}>
              <div className="row">
                <div className="form-input-group col col-6">
                  <label className="form-label">First Name</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Enter first name..."
                    {...register('firstName')}
                  />
                  {errors.firstName && <p className="form-error">{errors.firstName?.message}</p>}
                </div>
                <div className="form-input-group col col-6">
                  <label className="form-label">Last Name</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Enter last name..."
                    {...register('lastName')}
                  />
                  {errors.lastName && <p className="form-error">{errors.lastName?.message}</p>}
                </div>
              </div>
              <div className="form-input-group">
                <label className="form-label">Display Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Enter display name..."
                  {...register('displayName')}
                />
                {errors.displayName && <p className="form-error">{errors.displayName?.message}</p>}
              </div>
              <div className="row">
                <div className="form-input-group col col-6">
                  <label className="form-label">Date of birth</label>
                  <input className="form-input" type="date" {...register('dob')} />
                  {errors.dob && <p className="form-error">{errors.dob?.message}</p>}
                </div>
                <div className="form-input-group col col-6">
                  <label className="form-label">Gender</label>
                  <select className="form-select" defaultValue={''} {...register('gender')}>
                    <option disabled value="">
                      -- Chose your gender --
                    </option>
                    <option value={Gender.MALE}>Male</option>
                    <option value={Gender.FEMALE}>Female</option>
                    <option value={Gender.OTHER}>Other</option>
                  </select>
                  {errors.gender && <p className="form-error">{errors.gender?.message}</p>}
                </div>
              </div>
              <div className="form-input-group">
                <label className="form-label">Phone number</label>
                <input
                  className="form-input"
                  type="tel"
                  placeholder="Enter phone number..."
                  {...register('phoneNumber')}
                />
                {errors.phoneNumber && <p className="form-error">{errors.phoneNumber?.message}</p>}
              </div>
              <div className="form-input-group">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="Enter email..." {...register('email')} />
                {errors.email && <p className="form-error">{errors.email?.message}</p>}
              </div>
              <div className="form-input-group">
                <label className="form-label">Password</label>
                <div className="input-password-group">
                  <input
                    className="form-input input-password"
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="Enter password..."
                    {...register('password')}
                  />
                  <i
                    onClick={togglePassword}
                    className={`icon icon-password ${isShowPassword ? `icon-eye-slash` : `icon-eye`}`}
                  ></i>
                  {errors.password && <p className="form-error">{errors.password?.message}</p>}
                </div>
              </div>
              <button className="btn btn-primary btn-auth" type="submit">
                Register
              </button>
            </fieldset>
          </form>
          <p className="text-center">
            Already had an account?{' '}
            <Link className={`login-link ${isLoading && 'disable-link'}`} to="/login">
              {isLoading ? 'Loding...' : 'Login'}
            </Link>
          </p>
        </div>
        <div className="auth-bg col col-6">
          <img className="auth-img" src={require('../../../../assets/images/bg-auth.png')} alt="Auth background" />
        </div>
      </div>
    </div>
  );
};

export default Register;
