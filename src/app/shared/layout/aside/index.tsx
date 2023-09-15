import TopFollower from './components/TopFollower';
import TopPost from './components/TopPost';

const Aside = () => {
  return (
    <aside className="aside">
      <div className="row">
        <div className="col col-12 col-lg-6 col-sm-12">
          <TopFollower />
        </div>
        <div className="col col-12 col-lg-6 col-sm-12">
          <TopPost />
        </div>
      </div>
    </aside>
  );
};

export default Aside;
