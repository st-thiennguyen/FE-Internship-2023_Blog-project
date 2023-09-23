import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';
import UserPostList from './UserPostList';

const UserPost = () => {
  const posts = useSelector((state: RootState) => state.profile.data.posts);
  return (
    <section className="section section-user-post">
      <h2 className="section-title">Posts</h2>
      <UserPostList postList={posts} />
    </section>
  );
};

export default UserPost;
