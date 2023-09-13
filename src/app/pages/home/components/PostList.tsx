import PostItem from '../../../shared/components/PostItem';

const PostList = () => {
  return (
    <ul className="post-list">
      <div className="row">
        <div className="col col-6">
          <PostItem />
        </div>
        <div className="col col-6">
          <PostItem />
        </div>
      </div>
    </ul>
  );
};

export default PostList;
