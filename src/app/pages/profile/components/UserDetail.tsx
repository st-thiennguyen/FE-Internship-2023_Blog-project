import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { convertDateToString } from '../../../shared/utils';
import { ProfileModel } from '../../../models/user';
import Button from '../../../shared/components/Button';

const UserDetail = () => {
  const profile: ProfileModel = useSelector((state: RootState) => state.profile.data);

  const { id } = useParams();

  const [isErrAvt, setIsErrAvt] = useState(false);

  return (
    <section className="section section-user-detail">
      <h2 className="section-title text-center">{profile.displayName}</h2>
      <div className="user-detail-header d-flex item-center">
        <div className="user-avatar">
          <img
            onError={() => setIsErrAvt(true)}
            src={!isErrAvt ? profile.picture : require('../../../../assets/images/user-default.png')}
            alt={profile.displayName + ` avatar`}
            className="user-avatar-img"
          />
        </div>
        <ul className="user-social-list row justify-between">
          <li className="user-social-item col col-4">
            <div className="user-social">
              <p className="social-count text-center">{profile.posts?.length}</p>
              <p className="social-desc text-center">Posts</p>
            </div>
          </li>
          <li className="user-social-item col col-4">
            <div className="user-social">
              <p className="social-count text-center">{profile.followers}</p>
              <p className="social-desc text-center">Followers</p>
            </div>
          </li>
          <li className="user-social-item col col-4">
            <div className="user-social">
              <p className="social-count text-center">{profile.followings}</p>
              <p className="social-desc text-center">Following</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="user-detail-footer d-flex justify-between">
        <div className="user-detail-info">
          <h3 className="user-detail-fullname">{profile.firstName + ' ' + profile.lastName}</h3>
          <div className="detail-info-item d-flex item-center">
            <i className="icon icon-small icon-dob-20" />
            <p className="info-desc">{profile.dob}</p>
          </div>
          <div className="detail-info-item d-flex item-center">
            <i className="icon icon-small icon-mail-20" />
            <p className="info-desc">{profile.email}</p>
          </div>
        </div>
        <div className="user-detail-info">
          <div className="detail-info-item d-flex item-center">
            <i className="icon icon-small icon-phone-20" />
            <p className="info-desc">{profile.phone}</p>
          </div>
          <div className="detail-info-item d-flex item-center">
            <i className="icon icon-small icon-date-outline-20" />
            <p className="info-desc">Joined since {convertDateToString(profile?.verifyAt, '/')}</p>
          </div>
        </div>
        {id ? (
          <Button
            label={profile.isFollowed ? 'Following' : 'Follow'}
            optionClassName={`btn btn-follow ${profile.isFollowed ? 'btn-following' : 'btn-gradient'}`}
          ></Button>
        ) : (
          <Link to={'update'} className="btn btn-secondary">
            Update Information
          </Link>
        )}
      </div>
    </section>
  );
};

export default UserDetail;