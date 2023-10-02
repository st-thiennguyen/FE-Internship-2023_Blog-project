import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserInfo } from '../../models/auth';
import { isImageUrlValid } from '../utils';
import { updateFollowingAction } from '../../pages/profile/profile.actions';

import Button from './Button';
import IconHeart from './icon/IconHeart';
import avatarDefault from '../../../assets/images/user-default.png';
import { RootState } from '../../stores/store';

interface UserItemProps {
  user: UserInfo;
  type: string;
}

const ActionType = ({ user, type }: UserItemProps) => {
  const [isFollowed, setIsFollowed] = useState(true);
  const initialUser = JSON.parse(JSON.stringify(user));

  const dispatch = useDispatch();

  const handleUpdateFollow = () => {
    dispatch(updateFollowingAction(`${user.id}`, initialUser) as any);
    setIsFollowed(!isFollowed);
  };

  switch (type) {
    case 'Like list':
      return <IconHeart color="#e11d48" />;
    case 'My Following':
      return (
        <Button
          label={isFollowed ? 'Following' : 'Follow'}
          optionClassName={`btn btn-follow ${isFollowed ? 'btn-outline-primary btn-following' : 'btn-primary'}`}
          handleClick={handleUpdateFollow}
        ></Button>
      );
    default:
      return <></>;
  }
};

const UserItem = ({ user, type }: UserItemProps) => {
  const [isErrorAvatar, setIsErrorAvatar] = useState(false);
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);

  useEffect(() => {
    isImageUrlValid(user.picture).then((result) => setIsErrorAvatar(!result));
  }, [isErrorAvatar, user.picture]);

  return (
    <div className="user-item-info d-flex item-center justify-between">
      <Link
        className="user-detail d-flex item-center"
        to={`/profile${userId && userId !== user.id ? `/${user.id}` : ''}`}
      >
        <div className="user-avatar-wrapper">
          <img
            className="user-avatar"
            src={!isErrorAvatar ? user.picture : avatarDefault}
            alt={`${user.firstName} avatar`}
          />
        </div>
        <h4 className="user-item-name">{user.displayName ? user.displayName : user.firstName + ' ' + user.lastName}</h4>
      </Link>
      <div className="user-action">
        <ActionType type={type} user={user} />
      </div>
    </div>
  );
};

export default UserItem;
