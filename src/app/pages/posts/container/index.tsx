import { Outlet } from 'react-router-dom';

const PostPage = () => {
  return (
    <div className="posts-page">
      <Outlet />
    </div>
  );
};

export default PostPage;
