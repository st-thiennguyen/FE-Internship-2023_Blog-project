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
                <Link className="user-link" to={'/'}>
                  <img
                    className="user-avatar"
                    src={require('../../../../../assets/images/demo-cover.jpg')}
                    alt={user.displayName}
                  />
                </Link>
                <div className="user-info">
                  <h4 className="user-name">{user.displayName}</h4>
                  <span className="followers">{user.followers} followers</span>
                </div>
              </div>
              <button className="btn btn-secondary btn-follow">Follow</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopFollower;
