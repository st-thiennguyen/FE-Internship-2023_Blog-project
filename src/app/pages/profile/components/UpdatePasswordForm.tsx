import Button from '../../../shared/components/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordAction } from '../proflie.actions';
import { formChangePassword } from '../../../models/user';
import ToastMessage from '../../../shared/components/ToastMessage';
import { RootState } from '../../../stores/store';
import { useEffect, useState } from 'react';

const UpdatePasswordForm = () => {
  const isSuccess = useSelector((state: RootState) => state.profile.isSuccess);
  const isError = useSelector((state: RootState) => state.profile.isError);
  const message = useSelector((state: RootState) => state.profile.message);
  const [isShowErr, setIsShowErr] = useState(false);
  const dispatch = useDispatch();
  const schema = yup
    .object({
      oldPassword: yup.string().trim().required('Old password must not be null'),
      newPassword: yup.string().trim().required('Old password must not be null'),
      confirmPassword: yup
        .string()
        .trim()
        .required('Old password must not be null')
        .test('passwords-match', 'Confirm password must match new password', function (value) {
          return this.parent.newPassword === value;
        }),
    })
    .required();

  useEffect(() => {
    if (isError) {
      setIsShowErr(true);
    }
  }, [isError]);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onUpdatePassword = (data: formChangePassword) => {
    setIsShowErr(false);
    delete data.confirmPassword;
    dispatch(updatePasswordAction(data) as any);
    reset();
  };

  type FormData = yup.InferType<typeof schema>;
  return (
    <>
      <div className="update-password-tab">
        <div className="update-password-wrapper">
          <div className="update-password-form">
            <form className="form form-update-password" onSubmit={handleSubmit(onUpdatePassword)}>
              <fieldset className="form-fieldset" disabled={false}>
                <div className="form-input-group col col-8">
                  <label className="form-label">Old Password</label>
                  <input
                    {...register('oldPassword')}
                    className="form-input"
                    type="text"
                    placeholder="Enter old password..."
                  />
                  {errors.oldPassword && <p className="form-error">{errors.oldPassword?.message}</p>}
                </div>

                <div className="form-input-group col col-8">
                  <label className="form-label">New Password</label>
                  <input
                    {...register('newPassword')}
                    className="form-input"
                    type="text"
                    placeholder="Enter new password..."
                  />
                  {errors.newPassword && <p className="form-error">{errors.newPassword?.message}</p>}
                </div>

                <div className="form-input-group col col-8">
                  <label className="form-label">Confirm Password</label>
                  <input
                    {...register('confirmPassword')}
                    className="form-input"
                    type="text"
                    placeholder="Enter confirm password..."
                  />
                  {errors.confirmPassword && <p className="form-error">{errors.confirmPassword?.message}</p>}
                </div>
                {isShowErr && <p className="text-danger err-message">*{message}</p>}
                <div className="d-flex justify-center">
                  <Button label="Update" optionClassName="btn btn-primary btn-auth" isLoading={false} />
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <ToastMessage isShow={isSuccess} isSuccess={isSuccess} title={'Success'} subtitle={message} />
    </>
  );
};

export default UpdatePasswordForm;
