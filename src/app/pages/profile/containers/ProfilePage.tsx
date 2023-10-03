import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { fetchFollower, fetchFollowing, getUserProfileAction } from '../profile.actions';

import UserDetail from '../components/UserDetail';
import UserPost from '../components/UserPost';

const ProfilePage = () => {
  const isError = useSelector((state: RootState) => state.profile.isError);
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id === userId?.toString() || id === 'me') {
      navigate('/profile');
    }
    const idParams = id ? id : 'me';
    dispatch(getUserProfileAction(idParams) as any);
    dispatch(fetchFollower(idParams) as any);
    dispatch(fetchFollowing(idParams) as any);
  }, [id]);

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
