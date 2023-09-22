import { useEffect } from 'react';
import UserDetail from '../components/UserDetail';
import UserPost from '../components/UserPost';

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="main-profile-page">
      <UserDetail />
      <UserPost />
    </div>
  );
};

export default ProfilePage;
