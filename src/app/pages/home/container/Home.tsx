import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../../stores/store';
import { getRecommend } from '../home.actions';

import GoToTopBtn from '../../../shared/components/GoToTopBtn';
import LatestPost from '../components/LatestPost';
import Recommend from '../components/recommend';
import Aside from '../../../shared/layout/aside/container/Aside';
import { getLocalStorage } from '../../../shared/utils';
import { StorageKey } from '../../../shared/constants';
import { Auth } from '../../../models/auth';

const Home = () => {
  const localStorageAuth  = getLocalStorage(StorageKey.AUTH, {} as Auth);
  const isLogin = localStorageAuth?.accessToken;
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
    <section className="section section-home">
      <div className="container">
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
                <GoToTopBtn />
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
    </section>
  );
};

export default Home;
