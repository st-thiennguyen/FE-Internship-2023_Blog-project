import React, { useRef } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { Gender, regexPhoneNumber } from '../../../shared/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../../shared/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { convertDateFormat, convertDateToString } from '../../../shared/utils';
import { RootState } from '../../../stores/store';
import { updateProfileAction, uploadAvatar } from '../proflie.actions';
import ToastMessage from '../../../shared/components/ToastMessage';

const schema = yup
  .object({
    firstName: yup.string().trim().required('First Name must not be null'),
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
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const UserUpdateForm = () => {
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const user = useSelector((state: RootState) => state.auth.auth?.userInfo);
  const isSuccess = useSelector((state: RootState) => state.profile.isSuccess);
  const isLoading = useSelector((state: RootState) => state.profile.isLoading);
  const isError = useSelector((state: RootState) => state.profile.isError);
  const message = useSelector((state: RootState) => state.profile.message);
  const userPicture = useSelector((state: RootState) => state.profile.data.picture);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const clickSelectImage = () => {
    avatarInputRef.current!.click();
  };

  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file) {
      dispatch(
        uploadAvatar(file, {
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          dob: convertDateToString(user.dob, '/'),
          phone: user.phone,
          displayName: user.displayName,
          picture: userPicture,
        }) as any,
      );
    }
  };

  const onUpdateProfile = handleSubmit((data: FormData) => {
    dispatch(
      updateProfileAction({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        dob: convertDateToString(data.dob, '/'),
        phone: data.phoneNumber,
        displayName: data.displayName,
        picture: user.picture,
      }) as any,
    );
  });

  return (
    <div className="update-info-tab">
      <div className="update-info-wrapper">
        <div className="profile-avatar" onClick={clickSelectImage}>
          <img src={user.picture} alt={user.displayName} />
          <div className="profile-avatar-mark d-flex item-center justify-center">
            <i className="icon icon-small icon-camera-white-20"></i>
          </div>
          <input ref={avatarInputRef} className="profile-avatar-input" type="file" onChange={handleUploadAvatar} />
        </div>
        <div className="profile-update-form">
          <form className="form form-register" onSubmit={onUpdateProfile}>
            <fieldset className="form-fieldset" disabled={isLoading}>
              <div className="row">
                <div className="form-input-group col col-6">
                  <label className="form-label">First Name</label>
                  <input
                    className="form-input"
                    type="text"
                    placeholder="Enter first name..."
                    defaultValue={user.firstName}
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
                    defaultValue={user.lastName}
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
                  defaultValue={user.displayName}
                  {...register('displayName')}
                />
                {errors.displayName && <p className="form-error">{errors.displayName?.message}</p>}
              </div>
              <div className="row">
                <div className="form-input-group col col-6">
                  <label className="form-label">Date of birth</label>
                  <input
                    id="datepicker"
                    className="form-input"
                    type="date"
                    defaultValue={convertDateFormat(user.dob ?? '')}
                    {...register('dob')}
                  />
                  {errors.dob && <p className="form-error">{errors.dob?.message}</p>}
                </div>
                <div className="form-input-group col col-6">
                  <label className="form-label">Gender</label>
                  <select className="form-select" defaultValue={''} {...register('gender')}>
                    <option disabled defaultValue={user.gender}>
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
                  defaultValue={user.phone}
                  {...register('phoneNumber')}
                />
                {errors.phoneNumber && <p className="form-error">{errors.phoneNumber?.message}</p>}
              </div>

              <Button label="Update" optionClassName="btn btn-primary btn-auth" isLoading={false} />
            </fieldset>
          </form>
        </div>
      </div>
      {isSuccess && (
        <ToastMessage
          isShow={isSuccess}
          isSuccess={isSuccess}
          title={'Success'}
          subtitle={'Update profile successfully'}
        ></ToastMessage>
      )}
      {isError && (
        <ToastMessage isShow={isError} isSuccess={isSuccess} title={'Error'} subtitle={message}></ToastMessage>
      )}
    </div>
  );
};

export default UserUpdateForm;
