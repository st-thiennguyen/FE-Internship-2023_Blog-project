import { Link } from 'react-router-dom';
import { UserInfo } from '../../models/auth';
import IconHeart from './icon/IconHeart';

interface UserItemProps {
  user: UserInfo;
}

const UserItem = ({ user }: UserItemProps) => {
  return (
    <div className="user-item-info d-flex item-center justify-between">
      <Link className="user-detail d-flex item-center" to={`/profile/${user.id}`}>
        <div className="user-avatar-wrapper">
          <img className="user-avatar" src={user.picture} alt="" />
        </div>
        <h4 className="user-item-name"> {user.displayName}</h4>
      </Link>
      <div className="user-action">
        <IconHeart color="#e11d48" />
      </div>
    </div>
  );
};

export default UserItem;
