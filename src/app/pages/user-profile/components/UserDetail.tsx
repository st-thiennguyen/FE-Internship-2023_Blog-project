import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../../../stores/store';
import { convertDateToString } from '../../../shared/utils';
import Button from '../../../shared/components/Button';

const UserDetail = () => {
  const userProfile = useSelector((state: RootState) => state.userProfile.profile);
  const postList = useSelector((state: RootState) => state.userProfile.postList);

  const { displayName, email, firstName, lastName, followers, followings, isFollowed, picture, phone, dob } =
    userProfile;
  const { verifyAt, Posts } = postList;
  const { id } = useParams();

  const [isErrAvt, setIsErrAvt] = useState(false);

  return (
    <section className="section section-user-detail">
      <h2 className="section-title text-center">{displayName}</h2>
      <div className="user-detail-header d-flex item-center">
        <div className="user-avatar">
          <img
            onError={() => setIsErrAvt(true)}
            src={!isErrAvt ? picture : require('../../../../assets/images/user-default.png')}
            alt={displayName + ` avatar`}
            className="user-avatar-img"
          />
        </div>
        <ul className="user-social-list row justify-between">
          <li className="user-social-item col col-4">
            <div className="user-social">
              <p className="social-count text-center">{Posts?.length}</p>
              <p className="social-desc text-center">Posts</p>
            </div>
          </li>
          <li className="user-social-item col col-4">
            <div className="user-social">
              <p className="social-count text-center">{followers}</p>
              <p className="social-desc text-center">Followers</p>
            </div>
          </li>
          <li className="user-social-item col col-4">
            <div className="user-social">
              <p className="social-count text-center">{followings}</p>
              <p className="social-desc text-center">Following</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="user-detail-footer d-flex justify-between">
        <div className="user-detail-info">
          <h3 className="user-detail-fullname">{firstName + ' ' + lastName}</h3>
          <div className="detail-info-item d-flex item-center">
            <i className="icon icon-small icon-dob-20" />
            <p className="info-desc">{dob}</p>
          </div>
          <div className="detail-info-item d-flex item-center">
            <i className="icon icon-small icon-mail-20" />
            <p className="info-desc">{email}</p>
          </div>
        </div>
        <div className="user-detail-info">
          <div className="detail-info-item d-flex item-center">
            <i className="icon icon-small icon-phone-20" />
            <p className="info-desc">{phone}</p>
          </div>
          <div className="detail-info-item d-flex item-center">
            <i className="icon icon-small icon-date-outline-20" />
            <p className="info-desc">Joined since {convertDateToString(verifyAt, '/')}</p>
          </div>
        </div>
        {id ? (
          <Button
            label={isFollowed ? 'Following' : 'Follow'}
            optionClassName={`btn btn-follow ${isFollowed ? 'btn-following' : 'btn-gradient'}`}
          ></Button>
        ) : (
          <Link to={'/update-account'} className="btn btn-secondary">
            Update Information
          </Link>
        )}
      </div>
    </section>
  );
};

export default UserDetail;
