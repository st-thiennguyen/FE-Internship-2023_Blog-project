import { PostModel } from '../../../models/post';

import PostItem from '../../../shared/components/PostItem';
import EmptyPost from './EmptyPost';

interface PostListProps {
  posts: PostModel[];
}
const PostList = ({ posts }: PostListProps) => {
  return posts.length > 0 ? (
    <ul className="post-list row">
      {posts.map((post, index) => {
        return (
          <li className="post-item col col-6 col-md-12" key={index}>
            <PostItem post={post} />
          </li>
        );
      })}
    </ul>
  ) : (
    <EmptyPost />
  );
};

export default PostList;
