import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { Gender, regexPhoneNumber } from '../../../shared/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { updateProfileAction } from '../update-user.actions';
import { convertDateToString } from '../../../shared/utils';

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

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
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

  const onUpdateProfile = (data: FormData) => {
    dispatch(
      updateProfileAction(4, {
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        dob: convertDateToString(data.dob, '/'),
        phone: data.phoneNumber,
        displayName: data.displayName,
        picture: handlePictureByGender(data.gender),
      }) as any,
    );
  };
  return (
    <div className="update-profile-page">
      <div className=""></div>
    </div>
  );
};

export default UpdateProfile;
