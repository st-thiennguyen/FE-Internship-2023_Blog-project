import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { convertDateToString } from '../../../shared/utils';
import { ProfileModel } from '../../../models/user';

import Button from '../../../shared/components/Button';
import { updateFollowAction } from '../profile.actions';
import Loading from '../../../shared/components/Loading';

const UserDetail = () => {
  const profile: ProfileModel = useSelector((state: RootState) => state.profile.data);
  const isLoadingPage = useSelector((state: RootState) => state.profile.isLoading);
  const isLoadingFollow = useSelector((state: RootState) => state.profile.isLoadingFollow);

  const dispatch = useDispatch();
  const { id } = useParams();

  const [isErrAvt, setIsErrAvt] = useState(false);

  const handleUpdateFollow = () => {
    dispatch(updateFollowAction(id!) as any);
  };

  return (
    <section className="section section-user-detail">
      <div className="user-detail-wrapper">
        <div className="user-detail-bg"></div>
        <section className="section-user-info">
          <div className="container">
            {!isLoadingPage && (
              <div className="user-info d-flex item-center row">
                <div className="col col-2 col-lg-3">
                  <div className="user-avatar">
                    <img
                      onError={() => setIsErrAvt(true)}
                      src={!isErrAvt ? profile.picture : require('../../../../assets/images/user-default.png')}
                      alt={profile.displayName + ` avatar`}
                      className="user-avatar-img"
                    />
                  </div>
                </div>
                <div className="col col-10 col-lg-9">
                  <div className="user-content">
                    <h3 className="user-fullname">
                      {profile.firstName + ' ' + profile.lastName}{' '}
                      <span className="username">({profile.displayName})</span>
                    </h3>
                    <div className="user-contact d-flex item-center">
                      <a href={`mailto: ${profile.email}`} className="user-desc">
                        Email : {profile.email}
                      </a>
                      <a href={`tel: ${profile.phone}`} className="user-desc">
                        Phone : {profile.phone}
                      </a>
                    </div>
                    <div className="user-event d-flex item-center">
                      <div className="detail-info-item d-flex item-center">
                        <i className="icon icon-small icon-dob-20" />
                        <p className="user-desc">{profile.dob ? convertDateToString(profile?.dob, '/') : '--------'}</p>
                      </div>
                      <div className="detail-info-item d-flex item-center">
                        <i className="icon icon-small icon-date-outline-20" />
                        <p className="user-desc">
                          {profile?.verifyAt
                            ? `Joined since ${convertDateToString(profile?.verifyAt, '/')}`
                            : '--------'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="social-external">
                    <div className="user-social d-flex justify-between item-center">
                      <ul className="user-social-list d-flex">
                        <li className="user-social-item">
                          <div className="d-flex item-center">
                            <p className="social-count text-center ">{profile.followers}</p>
                            <p className="social-desc text-center">Followers</p>
                          </div>
                        </li>
                        <li className="user-social-item">
                          <div className="d-flex item-center">
                            <p className="social-count text-center">{profile.followings}</p>
                            <p className="social-desc text-center">Following</p>
                          </div>
                        </li>
                      </ul>
                      {id ? (
                        <Button
                          label={profile.isFollowed ? 'Following' : 'Follow'}
                          optionClassName={`btn btn-follow ${
                            profile.isFollowed ? 'btn-outline-primary btn-following' : 'btn-primary'
                          }`}
                          handleClick={handleUpdateFollow}
                          isLoading={isLoadingFollow}
                        ></Button>
                      ) : (
                        <Link to={'update'} className="btn btn-secondary">
                          Update Information
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        {/* <div className="user-detail-wrappers">
          {!isLoadingPage && (
            <>
              <h2 className="section-title text-center">
                {profile.displayName ? profile.displayName : profile.firstName + ' ' + profile.lastName}
              </h2>
              <div className="user-detail-header d-flex item-center">
                <div className="user-avatar">
                  <img
                    onError={() => setIsErrAvt(true)}
                    src={!isErrAvt ? profile.picture : require('../../../../assets/images/user-default.png')}
                    alt={profie.displayName + ` avatar`}
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
              <div className="user-detail-footer d-flex justify-between item-center">
                <div className="user-detail-info">
                  <h3 className="user-detail-fullname">{profile.firstName + ' ' + profile.lastName}</h3>

                  <div className="detail-info-item d-flex item-center">
                    <i className="icon icon-small icon-dob-20" />
                    <p className="info-desc">{profile.dob ? convertDateToString(profile?.dob, '/') : '--------'}</p>
                  </div>
                  <div className="detail-info-item d-flex item-center">
                    <i className="icon icon-small icon-mail-20" />
                    <a href={`mailto: ${profile.email}`} className="info-desc">
                      {profile.email}
                    </a>
                  </div>
                </div>
                <div className="user-detail-info">
                  <div className="detail-info-item d-flex item-center">
                    <i className="icon icon-small icon-phone-20" />
                    <a href={`tel:${profile.phone}`} className="info-desc">
                      {profile.phone || '--------'}
                    </a>
                  </div>
                  <div className="detail-info-item d-flex item-center">
                    <i className="icon icon-small icon-date-outline-20" />
                    <p className="info-desc">
                      {profile?.verifyAt ? `Joined since ${convertDateToString(profile?.verifyAt, '/')}` : '--------'}
                    </p>
                  </div>
                </div>
                {id ? (
                  <Button
                    label={profile.isFollowed ? 'Following' : 'Follow'}
                    optionClassName={`btn btn-follow ${
                      profile.isFollowed ? 'btn-outline-primary btn-following' : 'btn-primary'
                    }`}
                    handleClick={handleUpdateFollow}
                    isLoading={isLoadingFollow}
                  ></Button>
                ) : (
                  <Link to={'update'} className="btn btn-secondary">
                    Update Information
                  </Link>
                )}
              </div>
            </>
          )}
        </div> */}
      </div>
    </section>
  );
};

export default UserDetail;
