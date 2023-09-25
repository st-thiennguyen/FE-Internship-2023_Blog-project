import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { getRecommend } from '../home.actions';

import GoToTopBtn from '../../../shared/components/GoToTopBtn';
import LatestPost from '../components/LatestPost';
import Recommend from '../components/recommend';
import Aside from '../../../shared/layout/aside/container/Aside';

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
    <div className=" main-body">
      <div className="row">
        <div className="col col-9 col-lg-12">
          <div className="main-content">
            <div className="home-page">
              {isLogin && recommendPosts.length > 0 && <Recommend />}
              <div className="row">
                <div className="col col-12">
                  <LatestPost />
                </div>
              </div>
              <GoToTopBtn />{' '}
            </div>
          </div>
        </div>
        <div className="col col-3 col-lg-12">
          <div className="main-aside">
            <Aside />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
