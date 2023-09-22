import Button from '../../../shared/components/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordAction } from '../proflie.actions';
import { formChangePassword } from '../../../models/user';
import ToastMessage from '../../../shared/components/ToastMessage';
import { RootState } from '../../../stores/store';
import { useEffect } from 'react';

const UpdatePasswordForm = () => {
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

  const onUpdatePassword = (data: formChangePassword) => {
    delete data.confirmPassword;
    dispatch(updatePasswordAction(data) as any);
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
                    <input
                      {...register('oldPassword')}
                      className="form-input"
                      type="password"
                      placeholder="Enter old password..."
                    />
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
                    <label className="form-label">Confirm Password</label>
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
      {isSuccess && <ToastMessage isShow={isSuccess} isSuccess={isSuccess} title={'Success'} subtitle={message} />}
      {isError && <ToastMessage isShow={isError} isSuccess={!isError} title={'Error'} subtitle={message} />}
    </>
  );
};

export default UpdatePasswordForm;
