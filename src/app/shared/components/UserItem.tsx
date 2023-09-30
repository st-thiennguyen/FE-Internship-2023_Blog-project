import { Link } from 'react-router-dom';
import { UserInfo } from '../../models/auth';
import IconHeart from './icon/IconHeart';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { updateFollowAction } from '../../pages/profile/profile.actions';
import { useState } from 'react';

interface UserItemProps {
  user: UserInfo;
  type: string;
}

const ActionType = ({ user, type }: UserItemProps) => {
  const [isFollowed, setIsFollowed] = useState(true);

  const dispatch = useDispatch();

  const handleUpdateFollow = () => {
    dispatch(updateFollowAction(`${user.id}`, 'me') as any);
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
  return (
    <div className="user-item-info d-flex item-center justify-between">
      <Link className="user-detail d-flex item-center" to={`/profile/${user.id}`}>
        <div className="user-avatar-wrapper">
          <img className="user-avatar" src={user.picture} alt="" />
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
