import { PostModel } from '../../../models/post';
import PostItem from '../../../shared/components/PostItem';

interface UserPostListProps {
  posts: PostModel[];
}

const UserPostList = ({ posts }: UserPostListProps) => {
  return (
    <ul className="user-post-list row">
      {posts.map((post, index) => {
        return (
          <li className="post-item col col-6 col-md-12" key={index}>
            <PostItem post={post} />
          </li>
        );
      })}
    </ul>
  );
};

export default UserPostList;
