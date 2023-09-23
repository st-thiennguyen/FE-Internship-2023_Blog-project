import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';
import UserPostList from './UserPostList';

const UserPost = () => {
  const postList = useSelector((state: RootState) => state.userProfile.postList);
  return (
    <section className="section section-user-post">
      <h2 className="section-title">Posts</h2>
      <UserPostList postList={postList} />
    </section>
  );
};

export default UserPost;
