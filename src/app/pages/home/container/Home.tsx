import GoToTopBTn from '../../../shared/components/GoToTopBtn';
import LatestPost from '../components/LatestPost';
import Recommend from '../components/recommend';

const Home = () => {
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
