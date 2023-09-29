import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { getRecommend } from '../home.actions';

import GoToTopBtn from '../../../shared/components/GoToTopBtn';
import LatestPost from '../components/LatestPost';
import Recommend from '../components/recommend';
import { getLocalStorage } from '../../../shared/utils';
import { StorageKey } from '../../../shared/constants';

const Home = () => {
  const isLogin = getLocalStorage(StorageKey.ACCESS_TOKEN, '');
  const recommendPosts = useSelector((state: RootState) => state.recommend.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRecommend(1, 10) as any);
  }, []);

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  return (
    <div className="home-page">
      <div className="container">
        {isLogin && recommendPosts.length > 0 && <Recommend />}
        <LatestPost />
        <GoToTopBtn />
      </div>
    </div>
  );
};

export default Home;
