import GoToTopBtn from '../../../shared/components/GoToTopBtn';
import PostResult from '../components/PostResult';

const Posts = () => {
  return (
    <>
      <div className="row">
        <div className="col col-12">
          <PostResult />
        </div>
      </div>
      <GoToTopBtn />
    </>
  );
};

export default Posts;
