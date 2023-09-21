import { Link, useParams } from 'react-router-dom';
import Button from '../../../shared/components/Button';
import { ProfileModel } from '../../../models/post';
import { convertDateToString } from '../../../shared/utils';

interface UserDetailProps {
  userProfile: ProfileModel;
  postList: any;
}

const UserDetail = ({ userProfile, postList }: UserDetailProps) => {
  const { displayName, email, firstName, lastName, followers, followings, isFollowed, picture } = userProfile;
  const { verifyAt, Posts } = postList;
  const { id } = useParams();

  return (
    <section className="section section-user-detail">
      <h2 className="section-title text-center">{displayName}</h2>
      <div className="user-detail-header d-flex item-center">
        <div className="user-avatar">
          <img src={picture} alt="Khanh profile picture" className="user-avatar-img" />
        </div>
        <ul className="user-social-list row justify-between">
          <li className="user-social-item col col-4">
            <div className="user-social">
              <p className="social-count text-center">{Posts.length}</p>
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
            <i className="icon icon-small icon-mail-20" />
            <p className="info-desc">{email}</p>
          </div>
          <div className="detail-info-item d-flex item-center">
            <i className="icon icon-small icon-date-outline-20" />
            <p className="info-desc">Joined since {convertDateToString(verifyAt, '-')}</p>
          </div>
        </div>
        {id ? (
          <Button label={'Follow'} optionClassName="btn btn-follow btn-gradient"></Button>
        ) : (
          <Link to={'/update-account'} className="btn btn-secondary">
            Update Information
          </Link>
        )}
        {/* <Button label={'Following'} optionClassName="btn btn-follow btn-following"></Button> */}
      </div>
    </section>
  );
};

export default UserDetail;
