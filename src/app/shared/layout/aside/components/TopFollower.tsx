import { Link } from 'react-router-dom';
import { UserModel } from '../../../../models/user';

interface TopFollowerProps {
  users: UserModel[];
}
const TopFollower = ({ users }: TopFollowerProps) => {
  return (
    <div className="top-follower">
      <h3 className="aside-title">Top Follower</h3>
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
                    <h4 className="user-name">{user.displayName}</h4>
                  </Link>
                  <span className="followers">{user.followers} followers</span>
                </div>
              </div>
              <button className="btn btn-primary btn-follow">Follow</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopFollower;
