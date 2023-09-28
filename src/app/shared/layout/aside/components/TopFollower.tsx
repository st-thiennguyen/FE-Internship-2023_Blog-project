import { Link } from 'react-router-dom';
import { UserModel } from '../../../../models/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../stores/store';

interface TopFollowerProps {
  users: UserModel[];
}
const TopFollower = ({ users }: TopFollowerProps) => {
  const userId = useSelector((state: RootState) => state.auth?.userInfo.id);

  return (
    <div className="top-follower">
      <h3 className="aside-title">Top Followed Users</h3>
      <ul className="user-list">
        {users.map((user) => {
          return (
            <li className="user-item d-flex justify-between flex-wrap" key={user.id}>
              <div className="user-info-wrapper d-flex">
                <Link className="user-link" to={`/profile/${user.id}`}>
                  <img className="user-avatar" src={user.picture} alt={user.displayName} />
                </Link>
                <div className="user-info">
                  <Link className="user-link" to={`/profile/${user.id}`}>
                    <h4 className={`user-name ${userId === user.id && `text-primary`}`}>
                      {user.displayName || user.firstName + ' ' + user.lastName}
                    </h4>
                  </Link>
                  <span className="followers">{user.followers} followers</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopFollower;
