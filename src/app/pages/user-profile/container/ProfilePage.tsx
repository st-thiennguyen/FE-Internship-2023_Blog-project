import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { getUserPostAction, getUserProfileAction } from '../user-profile.action';

import UserDetail from '../components/UserDetail';
import UserPost from '../components/UserPost';
import Loading from '../../../shared/components/Loading';

const ProfilePage = () => {
  const userId = useSelector((state: RootState) => state.auth.auth?.userInfo.id);
  const isLoading = useSelector((state: RootState) => state.userProfile.isLoading);
  const isError = useSelector((state: RootState) => state.userProfile.isError);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id === userId.toString()) {
      navigate('/profile');
    }
  }, []);

  useEffect(() => {
    dispatch(getUserProfileAction(id ? id : 'me') as any);
    dispatch(getUserPostAction(id ? id : 'me') as any);
  }, [id]);

  if (isError) {
    navigate('/page-not-found');
  }

  return (
    <div className="main-profile-page">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <UserDetail />
          <UserPost />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
