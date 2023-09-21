import React, { useRef, useState } from 'react';

import { Gender, regexPhoneNumber } from '../../../shared/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { convertDateToString } from '../../../shared/utils';

import icInfo from '../../../../assets/icons/ic-update-profile-24.svg';
import icChangePass from '../../../../assets/icons/ic-change-password-24.svg';
import UserUpdateForm from '../components/UserUpdateForm';
import { RootState } from '../../../stores/store';
import UpdatePasswordForm from '../components/UpdatePasswordForm';

enum Tab {
  UPDATE_USER_INFO = 'user-info',
  CHANGE_PASSWORD = 'change-password',
}

const UpdateProfile = () => {
  const avatarRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>();
  const [tab, setTab] = useState<Tab>(Tab.UPDATE_USER_INFO);
  const dispatch = useDispatch();

  const onChangeTab = (value: Tab) => {
    setTab(value);
  };

  return (
    <div className="update-profile">
      <section className="section section-update-profile">
        <div className="update-profile-wrapper">
          <nav>
            <ul className="tabs-list">
              <li className={`tabs-item ${tab === Tab.UPDATE_USER_INFO ? 'active' : ''}`}>
                <div
                  title="Update Information"
                  className="tabs-link d-flex justify-center item-center"
                  onClick={() => onChangeTab(Tab.UPDATE_USER_INFO)}
                >
                  <img src={icInfo} alt="Icon update infomation" />
                  Update Information
                </div>
              </li>
              <li className={`tabs-item ${tab === Tab.CHANGE_PASSWORD ? 'active' : ''}`}>
                <div
                  title="Update Information"
                  className="tabs-link d-flex justify-center item-center"
                  onClick={() => onChangeTab(Tab.CHANGE_PASSWORD)}
                >
                  <img src={icChangePass} alt="Icon update infomation" />
                  Change Password
                </div>
              </li>
            </ul>
          </nav>

          <div className="tab-content-wrapper">
            <section
              id="tab-update-info-content"
              className={`section section-update-info ${tab === Tab.UPDATE_USER_INFO ? 'active' : ''}`}
              data-tab-content
            >
              <UserUpdateForm />
            </section>
            <section
              id="tab-change-password-content"
              className={`section section-change-password ${tab === Tab.CHANGE_PASSWORD ? 'active' : ''}`}
              data-tab-content
            >
              <div className="tab-content">
                <UpdatePasswordForm />
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UpdateProfile;
