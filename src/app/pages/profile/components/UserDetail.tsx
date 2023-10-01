import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { convertDateToString } from '../../../shared/utils';
import { ProfileModel } from '../../../models/user';
import { UserInfo } from '../../../models/auth';
import { updateFollowAction } from '../profile.actions';

import Button from '../../../shared/components/Button';
import UserList from '../../../shared/components/UserList';

const UserDetail = () => {
  const profile: ProfileModel = useSelector((state: RootState) => state.profile.data);
  const isLoadingPage = useSelector((state: RootState) => state.profile.isLoading);
  const isLoadingFollow = useSelector((state: RootState) => state.profile.isLoadingFollow);
  const followers = useSelector((state: RootState) => state.profile.followers);
  const following = useSelector((state: RootState) => state.profile.following);

  const [isShowList, setIsShowList] = useState(false);
  const [listTitle, setListTitle] = useState('');
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [isErrAvt, setIsErrAvt] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  const handleUpdateFollow = () => {
    dispatch(updateFollowAction(id!) as any);
  };

  const handleClose = () => {
    setIsShowList(false);
  };

  const handleShow = (title: string, type: UserInfo[]) => {
    if (type.length) {
      setIsShowList(true);
      if (title === 'Following' && !id) {
        setListTitle('My Following');
      } else setListTitle(title);
      setUserList(type);
    }
  };

  return (
    <section className="section section-user-detail">
      <div className="user-detail-wrapper">
        <div className="user-detail-bg"></div>
        <section className="section-user-info">
          <div className="container">
            {!isLoadingPage && (
              <div className="user-info d-flex item-center row">
                <div className="col col-3 col-lg-3">
                  <div className="user-avatar">
                    <img
                      onError={() => setIsErrAvt(true)}
                      src={!isErrAvt ? profile.picture : require('../../../../assets/images/user-default.png')}
                      alt={profile.displayName + ` avatar`}
                      className="user-avatar-img"
                    />
                  </div>
                </div>
                <div className="col col-9 col-lg-9">
                  <div className="user-content">
                    <h3 className="user-fullname">
                      {profile.firstName + ' ' + profile.lastName}{' '}
                      {profile.displayName && <span className="username">({profile.displayName})</span>}
                    </h3>
                    <div className="user-contact d-flex item-center">
                      <i className="icon icon-small icon-email-20"></i>
                      <a href={`mailto: ${profile.email}`} className="user-desc">
                        {profile.email}
                      </a>
                    </div>
                    <div className="user-contact d-flex item-center">
                      <i className="icon icon-small icon-phone-20"></i>
                      <a href={`tel: ${profile.phone}`} className="user-desc">
                        {profile.phone ? profile.phone : '--------'}
                      </a>
                    </div>
                    <div className="user-event d-flex item-center">
                      <div className="detail-info-item d-flex item-center">
                        <i className="icon icon-small icon-dob-20" />
                        <p className="user-desc">{profile.dob ? profile?.dob : '--------'}</p>
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
                        <li className="user-social-item" onClick={() => handleShow('Followers', followers)}>
                          <div className="d-flex item-center">
                            <p className="social-count text-center ">
                              {profile.followers > 0 ? profile.followers : '0'}
                            </p>
                            <p className="social-desc text-center">Followers</p>
                          </div>
                        </li>
                        <li className="user-social-item">
                          <div className="d-flex item-center" onClick={() => handleShow('Following', following)}>
                            <p className="social-count text-center">
                              {profile.followings > 0 ? profile.followings : '0'}
                            </p>
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
      </div>
      {isShowList && <UserList title={listTitle} show={isShowList} handleClose={handleClose} list={userList} />}
    </section>
  );
};

export default UserDetail;
