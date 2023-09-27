import { PostModel } from '../../../models/post';

import PostItem from '../../../shared/components/PostItem';
import EmptyPost from '../../../shared/components/EmptyPost';

interface PostListProps {
  posts: PostModel[];
  isLoading?: Boolean;
}
const PostList = ({ posts, isLoading }: PostListProps) => {
  return posts.length > 0 || isLoading ? (
    <ul className="post-list row">
      {posts.map((post, index) => {
        return (
          <li className="post-item col col-4 col-lg-6 col-sm-12" key={index}>
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
