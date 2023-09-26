import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { updatePasswordAction } from '../profile.actions';
import { FormChangePassword } from '../../../models/user';
import { RootState } from '../../../stores/store';

import ToastMessage from '../../../shared/components/ToastMessage';
import Button from '../../../shared/components/Button';

interface UpdateUserPasswordFormProps {
  isShowToast: boolean;
  setIsShowToast: (value: boolean) => void;
}

const UpdatePasswordForm = ({ isShowToast, setIsShowToast }: UpdateUserPasswordFormProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const isSuccess = useSelector((state: RootState) => state.profile.isSuccess);
  const isError = useSelector((state: RootState) => state.profile.isError);
  const message = useSelector((state: RootState) => state.profile.message);
  const isLoading = useSelector((state: RootState) => state.profile.isLoading);

  const dispatch = useDispatch();
  const schema = yup
    .object({
      oldPassword: yup.string().trim().required('Old password must not be null'),
      newPassword: yup
        .string()
        .trim()
        .required('new password password must not be null')
        .min(4, 'New Password must not be less than 4 characters')
        .max(40, 'New Password must be less than 40 characters'),
      confirmPassword: yup
        .string()
        .trim()
        .required('Confirm password must not be null')
        .test('passwords-match', 'Confirm password must match new password', function (value) {
          return this.parent.newPassword === value;
        }),
    })
    .required();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onUpdatePassword = (data: FormChangePassword) => {
    delete data.confirmPassword;
    dispatch(updatePasswordAction(data) as any);
    setIsShowToast(true);
  };

  const togglePassword = (): void => {
    setIsShowPassword(!isShowPassword);
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

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
                        type={isShowPassword ? 'text' : 'password'}
                        placeholder="Enter old password..."
                      />
                      <i
                        onClick={togglePassword}
                        className={`icon icon-password ${isShowPassword ? `icon-eye-slash` : `icon-eye`}`}
                      />
                    </div>
                    {errors.oldPassword && <p className="form-error">{errors.oldPassword?.message}</p>}
                  </div>

                  <div className="form-input-group col col-6">
                    <label className="form-label">New Password</label>
                    <input
                      {...register('newPassword')}
                      className="form-input"
                      type="password"
                      placeholder="Enter new password..."
                    />
                    {errors.newPassword && <p className="form-error">{errors.newPassword?.message}</p>}
                  </div>

                  <div className="form-input-group col col-6">
                    <label className="form-label">Confirm New Password</label>
                    <input
                      {...register('confirmPassword')}
                      className="form-input"
                      type="password"
                      placeholder="Enter confirm password..."
                    />
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
      {isShowToast && isSuccess && (
        <ToastMessage isShow={isSuccess} isSuccess={isSuccess} title={'Success'} subtitle={message} />
      )}
      {isShowToast && isError && (
        <ToastMessage isShow={isError} isSuccess={!isError} title={'Error'} subtitle={message} />
      )}
    </>
  );
};

export default UpdatePasswordForm;
