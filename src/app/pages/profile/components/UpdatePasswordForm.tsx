import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { RootState } from '../../../stores/store';
import { FormChangePassword } from '../../../models/user';
import { updatePasswordAction } from '../profile.actions';

import Button from '../../../shared/components/Button';

const UpdatePasswordForm = () => {
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);

  const [isShowNewPassword, setIsShowNewPassword] = useState(false);

  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const isSuccess = useSelector((state: RootState) => state.profile.isSuccess);
  const isLoading = useSelector((state: RootState) => state.profile.isLoading);
  const isLogoutSuccess = useSelector((state: RootState) => state.auth.isLogoutSuccess);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = yup
    .object({
      oldPassword: yup
        .string()
        .trim()
        .required('Old password must not be null')
        .min(6, 'Password must not be less than 6 characters')
        .max(40, 'Password must be less than 40 characters'),
      newPassword: yup
        .string()
        .trim()
        .required('new password password must not be null')
        .min(6, 'New Password must not be less than 6 characters')
        .max(40, 'New Password must be less than 40 characters'),
      confirmPassword: yup
        .string()
        .trim()
        .test('passwords-match', 'Confirm password must match new password', function (value) {
          return value === this.parent.newPassword;
        }),
    })
    .required();

  const {
    reset,
    register,
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onUpdatePassword = (data: FormChangePassword) => {
    dispatch(updatePasswordAction({ oldPassword: data.oldPassword, newPassword: data.newPassword }) as any);
  };

  const toggleOldPassword = (): void => {
    setIsShowOldPassword(!isShowOldPassword);
  };

  const toggleNewPassword = (): void => {
    setIsShowNewPassword(!isShowNewPassword);
  };

  const toggleConfirmPassword = (): void => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
    if (isLogoutSuccess) {
      navigate('/');
    }
  }, [isSuccess, isLogoutSuccess]);

  const newPass = watch('newPassword');
  const confirmPass = watch('confirmPassword');

  useEffect(() => {
    if (newPass && !isLoading) {
      trigger('confirmPassword');
    }
    if (confirmPass && !isLoading) {
      trigger('newPassword');
    }
  }, [newPass, confirmPass]);

  type FormData = yup.InferType<typeof schema>;
  return (
    <>
      <div className="update-password-tab">
        <div className="update-password-wrapper">
          <div className="update-password-form">
            <form className="form form-update-password" onSubmit={handleSubmit(onUpdatePassword)}>
              <fieldset className="form-fieldset" disabled={isLoading}>
                <div className="row">
                  <div className="form-input-group col col-12">
                    <label className="form-label">Old Password</label>
                    <div className="input-password-group">
                      <input
                        {...register('oldPassword')}
                        className="form-input input-password"
                        type={isShowOldPassword ? 'text' : 'password'}
                        placeholder="Enter old password..."
                      />
                      <i
                        onClick={toggleOldPassword}
                        className={`icon icon-password ${isShowOldPassword ? `icon-eye-slash` : `icon-eye`}`}
                      />
                    </div>
                    {errors.oldPassword && <p className="form-error">{errors.oldPassword?.message}</p>}
                  </div>

                  <div className="form-input-group col col-6">
                    <label className="form-label">New Password</label>
                    <div className="input-password-group">
                      <input
                        {...register('newPassword')}
                        className="form-input"
                        type={isShowNewPassword ? 'text' : 'password'}
                        placeholder="Enter new password..."
                      />
                      <i
                        onClick={toggleNewPassword}
                        className={`icon icon-password ${isShowNewPassword ? `icon-eye-slash` : `icon-eye`}`}
                      />
                    </div>

                    {errors.newPassword && <p className="form-error">{errors.newPassword?.message}</p>}
                  </div>

                  <div className="form-input-group col col-6">
                    <label className="form-label">Confirm New Password</label>
                    <div className="input-password-group">
                      <input
                        {...register('confirmPassword')}
                        className="form-input"
                        type={isShowConfirmPassword ? 'text' : 'password'}
                        placeholder="Enter confirm password..."
                      />
                      <i
                        onClick={toggleConfirmPassword}
                        className={`icon icon-password ${isShowConfirmPassword ? `icon-eye-slash` : `icon-eye`}`}
                      />
                    </div>
                    {errors.confirmPassword && <p className="form-error">{errors.confirmPassword?.message}</p>}
                  </div>
                </div>

                <div className="d-flex justify-center mt-5">
                  <Button label="Update" optionClassName="btn btn-primary btn-auth" isLoading={isLoading} />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePasswordForm;
