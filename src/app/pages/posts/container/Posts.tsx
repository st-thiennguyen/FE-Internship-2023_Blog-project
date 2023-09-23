import GoToTopBTn from '../../../shared/components/GoToTopBtn';
import PostResult from '../components/PostResult';

const Posts = () => {
  return (
    <div className="home-page">
      <div className="row">
        <div className="col col-12">
          <PostResult />
        </div>
      </div>
      <GoToTopBTn />
    </div>
  );
};

export default Posts;
