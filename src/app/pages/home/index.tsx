import Aside from '../../shared/layout/aside';
import LatestPost from './components/LatestPost';
import Recommend from './components/Recommend';

const Home = () => {
  return (
    <div className="home-page">
      <Recommend />
      <div className="container">
        <div className="row">
          <div className="col col-8">
            <LatestPost />
          </div>
          <div className="col col-4">
            <Aside />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
