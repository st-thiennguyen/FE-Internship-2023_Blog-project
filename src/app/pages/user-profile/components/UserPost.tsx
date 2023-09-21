import { useSelector } from 'react-redux';
import { PostModel } from '../../../models/post';
import UserPostList from './UserPostList';
import { RootState } from '../../../stores/store';

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
