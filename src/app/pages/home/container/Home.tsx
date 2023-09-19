import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import LatestPost from '../components/LatestPost';
import Recommend from '../components/recommend';
import { RootState } from '../../../stores/store';
import GoToTopBtn from '../../../shared/components/GoToTopBtn';

const Home = () => {
  const isLogin = useSelector((state: RootState) => state.auth.auth?.accessToken);
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
      <GoToTopBtn />
    </div>
  );
};

export default Home;
