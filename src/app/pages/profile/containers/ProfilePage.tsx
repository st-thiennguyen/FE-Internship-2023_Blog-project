import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { fetchFollower, fetchFollowing, getUserProfileAction } from '../profile.actions';

import UserDetail from '../components/UserDetail';
import UserPost from '../components/UserPost';

const ProfilePage = () => {
  const isError = useSelector((state: RootState) => state.profile.isError);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const userId = id ? id : 'me';
    dispatch(getUserProfileAction(userId) as any);
    dispatch(fetchFollower(userId) as any);
    dispatch(fetchFollowing(userId) as any);
  }, []);

  if (isError) {
    navigate('/page-not-found');
  }

  return (
    <div className="main-profile-page">
      <UserDetail />
      <UserPost />
    </div>
  );
};

export default ProfilePage;
