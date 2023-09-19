import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import GoToTopBTn from '../../shared/components/GoToTopBtn';
import LatestPost from './components/LatestPost';
import Recommend from './components/recommend';
import { RootState } from '../../redux/store';

const Home = () => {
  const isLogin = useSelector((state: RootState) => state.login.auth?.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  return (
    <div className="home-page">
      <Recommend />
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
