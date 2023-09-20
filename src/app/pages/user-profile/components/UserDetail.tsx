import { Link } from 'react-router-dom';
import defaultAvatar from '../../../../assets/images/demo-ava.jpg';
import Button from '../../../shared/components/Button';

const UserDetail = () => {
  return (
    <section className="section section-user-detail">
      <h2 className="section-title text-center">Khanh Ngo H.</h2>
      <div className="user-detail-header d-flex item-center">
        <div className="user-avatar">
          <img src={defaultAvatar} alt="Khanh profile picture" className="user-avatar-img" />
        </div>
        <ul className="user-social-list row justify-between">
          <li className="user-social-item col col-4">
            <div className="user-social">
              <p className="social-count text-center">12</p>
              <p className="social-desc text-center">Posts</p>
            </div>
          </li>
          <li className="user-social-item col col-4">
            <div className="user-social">
              <p className="social-count text-center">123</p>
              <p className="social-desc text-center">Followers</p>
            </div>
          </li>
          <li className="user-social-item col col-4">
            <div className="user-social">
              <p className="social-count text-center">123344</p>
              <p className="social-desc text-center">Following</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="user-detail-footer d-flex justify-between">
        <div className="user-detail-info">
          <h3 className="user-detail-fullname">Jane Doe</h3>
          <div className="detail-info-item d-flex item-center">
            <i className="icon icon-small icon-mail-20" />
            <p className="info-desc">jane.doe@supremetech.vn</p>
          </div>
          <div className="detail-info-item d-flex item-center">
            <i className="icon icon-small icon-date-outline-20" />
            <p className="info-desc">Joined since 01-01-2000</p>
          </div>
        </div>
        <Button label={'Follow'} optionClassName="btn btn-follow btn-gradient"></Button>
        <Button label={'Following'} optionClassName="btn btn-follow btn-following"></Button>
        <Link to={'/update-account'} className="btn btn-secondary">
          Update Information
        </Link>
      </div>
    </section>
  );
};

export default UserDetail;
