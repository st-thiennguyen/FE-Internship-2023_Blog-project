import { Outlet } from 'react-router-dom';

const PostPage = () => {
  return (
    <div className="posts-page">
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default PostPage;
