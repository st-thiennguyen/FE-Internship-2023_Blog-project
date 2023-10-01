import GoToTopBtn from '../../../shared/components/GoToTopBtn';
import LatestPost from '../components/LatestPost';
import Recommend from '../components/recommend';

const Home = () => {
  return (
    <div className="home-page">
      <div className="container">
        <Recommend />
        <LatestPost />
        <GoToTopBtn />
      </div>
    </div>
  );
};

export default Home;
