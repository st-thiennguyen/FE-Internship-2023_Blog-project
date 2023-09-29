import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';
import UserPostList from './UserPostList';
import PostItemLoading from '../../home/components/PostItemLoading';

const UserPost = () => {
  const posts = useSelector((state: RootState) => state.profile.data.posts);
  const isLoading = useSelector((state: RootState) => state.profile.isLoading);

  return (
    <section className="section section-user-post">
      <div className="container">
        <h2 className="section-title">Posts</h2>
        {isLoading ? (
          <ul className="row">
            {Array.from({ length: 3 }, (item, index) => (
              <li className="post-item col col-3 col-md-4" key={index}>
                <PostItemLoading />
              </li>
            ))}
          </ul>
        ) : (
          posts && <UserPostList postList={posts} />
        )}
      </div>
    </section>
  );
};

export default UserPost;
