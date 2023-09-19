import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import GoToTopBTn from '../../../shared/components/GoToTopBtn';
import LatestPost from '../components/LatestPost';
import Recommend from '../components/recommend';
import { RootState } from '../../../stores/store';
import { getRecommend } from '../home.actions';

const Home = () => {
  const isLogin = useSelector((state: RootState) => state.auth.auth?.accessToken);
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
      {isLogin && recommendPosts.length > 0 && (
        <>
          <h2 className="section-title">Recommended for you</h2>
          <Recommend />
        </>
      )}
      <div className="row">
        <div className="col col-12">
          <LatestPost />
        </div>
      </div>
      <GoToTopBTn />
    </div>
  );
};

export default Home;
