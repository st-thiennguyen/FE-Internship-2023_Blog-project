import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../../../../stores/store';
import LatestPost from '../components/LatestPost';
import Recommend from '../components/recommend';

const Home = () => {
  const [offset, setOffset] = useState(0);
  const isLogin = useSelector((state: RootState) => state.auth.auth?.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    goToTop();
  }, []);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);

    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="home-page">
      <Recommend />
      <div className="row">
        <div className="col col-12">
          <LatestPost />
        </div>
      </div>
      {offset > 1000 && (
        <button className="btn-backtotop  d-flex justify-center item-center" onClick={goToTop}>
          <i className="icon icon-medium icon-arrow-up-24"></i>
        </button>
      )}
    </div>
  );
};

export default Home;
