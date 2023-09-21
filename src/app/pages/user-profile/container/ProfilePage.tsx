import { useEffect, useState } from 'react';
import UserDetail from '../components/UserDetail';
import UserPost from '../components/UserPost';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPostAction, getUserProfileAction } from '../user-profile.action';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../stores/store';

const ProfilePage = () => {
  const userId = useSelector((state: RootState) => state.auth.auth?.userInfo.id);
  const userProfile = useSelector((state: RootState) => state.userProfile.profile);
  const postList = useSelector((state: RootState) => state.userProfile.postList);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id && id === userId.toString()) {
      navigate('/profile');
    }
  }, []);

  useEffect(() => {
    dispatch(getUserProfileAction(id ? id : 'me') as any);
    dispatch(getUserPostAction(id ? id : 'me') as any);
  }, [id]);

  return (
    <div className="main-profile-page">
      <UserDetail userProfile={userProfile} postList={postList} />
      <UserPost />
    </div>
  );
};

export default ProfilePage;
