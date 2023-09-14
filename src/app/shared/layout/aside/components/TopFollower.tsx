import { Link } from 'react-router-dom';

const users = [
  {
    id: 1,
    email: 'quan.do@supremetech.vn',
    firstName: 'do',
    lastName: 'quan',
    gender: 'male|female|other',
    dob: '19/10/1995',
    phone: '',
    displayName: 'st-quando',
    picture: '../../../../../assets/images/demo-cover.jpg',
    followers: 2345,
    followings: 0,
  },
  {
    id: 2,
    email: 'viet.nguyen@supremetech.vn',
    firstName: 'nguyen',
    lastName: 'viet',
    gender: 'male|female|other',
    dob: '14/05/2000',
    phone: '',
    displayName: 'st-vietnguyen',
    picture: '../../../../../assets/images/demo-cover.jpg',
    followers: 199,
    followings: 0,
  },
  {
    id: 3,
    email: 'thien.nguyen@supremetech.vn',
    firstName: 'nguyen',
    lastName: 'thien',
    gender: 'male|female|other',
    dob: '19/10/1995',
    phone: '',
    displayName: 'st-thiennguyen',
    picture: '../../../../../assets/images/demo-cover.jpg',
    followers: 7,
    followings: 0,
  },
];

const TopFollower = () => {
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
                    alt="User avatar"
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
